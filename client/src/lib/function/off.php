<?php
class Off
{
    private MoySklad $ms;

    public function __construct($ms)
    {
        $this->ms = $ms;
    }


    private function currentOff(int $total): int
    {
        $result = 0;
        if (Session::$off15) {
            $result = 15;
        } else if (Session::$ip) {
            if ($total >= 50_000_00) {
                $result = 5;
            }
            if ($total >= 100_000_00) {
                $result = 10;
            }
            if ($total >= 1_000_000_00) {
                $result = 25;
            }
        } else {
            if ($total >= 4_500_00) {
                $result = 10;
            }
            if ($total >= 10_000_00) {
                $result = 15;
            }
        }
        return $result;
    }

    private function needsOptPrice(int $total): bool
    {
        if (Session::$ip && $total >= 4_500_00) {
            return true;
        }
        return false;
    }

    private function getProducts(): \Generator
    {
        foreach ($_COOKIE as $key => $value) {
            if (str_starts_with($key, "b-")) {
                if (key_exists("only", $_COOKIE) && $_COOKIE["only"] != substr($key, 2)) {
                    continue;
                }
                $product = Product::collection($this->ms)->filter("id", "=", substr($key, 2))->get()->current();
                yield ["product" => $product, "count" => intval($value), "viewCount" => intval($value)];
            }
        }
    }

    private function getPacks(array $products, bool $ip): array
    {
        $packs = [];
        $error = [];
        if($ip){
            foreach ($products as $p){
                $packSize = 25;
                if(sizeof($p["product"]->packs) > 0){
                    $packSize = $p["product"]->packs[0]->quantity;
                }
                $packs[] = array_merge($p, ["count" => $p["viewCount"] * $packSize]);
            }
        } else {
            $packCounts = [];
            foreach ($products as $p){
                $packSize = 25;
                if(sizeof($p["product"]->packs) > 0){
                    $packSize = $p["product"]->packs[0]->quantity;
                }

                if(!key_exists($packSize, $packCounts)){
                    $packCounts[$packSize] = 0;
                }

                $packCounts[$packSize] += $p["count"];
            }
            foreach ($products as $p){
                $packSize = 25;
                if(sizeof($p["product"]->packs) > 0){
                    $packSize = $p["product"]->packs[0]->quantity;
                }

                if($packCounts[$packSize] % $packSize == 0){
                    $packs[] = $p;
                } else {
                    $error[] = [
                        "addTo" => $p["count"] + $packSize - $packCounts[$packSize] % $packSize,
                        "id" => $p["product"]->id,
                        "countInPack" => $packSize,
                    ];
                }
            }

        }

        return [
            "ok" => sizeof($error) == 0,
            "packs" => $packs,
            "errors" => $error
        ];
    }


    private function calcPrices(array $products, bool $opt): \Generator
    {
        $priceId = $opt ? 2 : 1;

        foreach ($products as $p) {
            $product = $p["product"];
            $count = $p["count"];
            $price = $product->salePrices[$priceId]->value;
            yield [
                "id" => $product->id,
                "price" => $price,
                "count" => $count,
                "total" => $price * $count,
            ];
        }
    }

    private function calcTotal(array $prices, int $off): int
    {
        $priceModifier = 1 - $off / 100;
        return array_sum(array_map(fn($x) => $x["price"] * $x["count"], $prices)) * $priceModifier;
    }

    private function preCalc(array $products, bool $opt, int $off): array
    {
        $prices = iterator_to_array($this->calcPrices($products, $opt));
        $total = $this->calcTotal($prices, $off);
        return [
            "prices" => $prices,
            "total" => $total
        ];
    }

    public function calc(): array
    {
        $ps = iterator_to_array($this->getProducts());
        $packs = $this->getPacks($ps, Session::$ip);
        $products = $packs["packs"];
        $retailData = $this->preCalc($products, false, 0);
        $optValue = $this->needsOptPrice($retailData["total"]);
        $offValue = $this->currentOff($retailData["total"]);
        $withoutOffData = $this->preCalc($products, $optValue, 0);
        $withOffData = $this->preCalc($products, $optValue, $offValue);
        return [
            "prices" => $withOffData["prices"],
            "total" => $withOffData["total"],
            "totalNoOff" => $withoutOffData["total"],
            "off" => $offValue,
            "ok" => $packs["ok"],
            "errors" => $packs["errors"],
        ];
    }
}