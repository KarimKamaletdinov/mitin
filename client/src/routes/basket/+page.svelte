<script>
    import { onMount } from "svelte";
    import Product from "../../shared/product/Product.svelte";
    import basket from "$lib/function/basket";
    import product from "$lib/function/product";
    import calc from "$lib/function/calc";
    import Button from "../../shared/forms/Button.svelte";
    import DesktopHeader from "../../shared/header/DesktopHeader.svelte";
    import MobileFooter from "../../shared/header/MobileFooter.svelte";
    let products = [];
    onMount(async () => {
        const list = await basket.list();
        const ps = [];
        for (const id in list) {
            const p = await product.byId(id);
            p.basketCount = list[id];
            ps.push(p);
        }
        products = ps;
    });
    let sum = {
        noOff: 0,
        withOff: 0,
        off: 0,
    };
    $: sum = calc.sum(products, true);
</script>

<DesktopHeader />
<MobileFooter />
<main class="bg-eb grid d:grid-flow-col d:px-100 px-20 gap-45 min-h-[100vh]">
    <div class="d:pt-30 grid grid-cols-2 d:grid-cols-1 d:gap-30 gap-12">
        {#each products as p}
            {#if p.basketCount > 0}
                <Product bind:product={p} basket />
            {/if}
        {/each}
    </div>
    <div
        class="hidden d:block mt-65 w-660 h-290 bg-w shadow-n
    rounded-20 px-55 pt-6"
    >
        <h1 class="font-bold text-32 text-center">Ваш заказ</h1>
        <div class="bg-lb w-550 h-[2px] mt-15 mb-8"></div>
        <div class="flex justify-between px-40">
            <dt class="text-22 font-bold">
                Товары: {products.reduce((i, x) => i + x.basketCount, 0)}
            </dt>
            <dt class="text-22 font-bold">
                {sum.noOff}₽
            </dt>
        </div>
        <div class="flex justify-between px-40 my-14">
            <dt class="text-22 font-bold">
                Скидка: {sum.off}%
            </dt>
            <dt class="text-22 font-bold">
                {(sum.noOff * sum.off) / 100}₽
            </dt>
        </div>
        <div class="bg-lb w-550 h-[2px] mt-15 mb-8"></div>
        <div class="flex justify-between px-40 my-14">
            <dt class="text-22 font-bold">Общая стоимость:</dt>
            <dt class="text-22 font-bold">
                {sum.withOff}₽
            </dt>
        </div>
        <div class="bg-lb w-550 h-[2px] mt-15 mb-8"></div>
        <a
            href="/contract"
            class="block w-466 mx-auto mt-20 rounded-10
        bg-lb h-50 font-bold text-24 leading-50 text-w text-center"
        >
            ПЕРЕЙТИ К ОФОРМЛЕНИЮ
        </a>
    </div>
</main>
<a href="contract" class="d:hidden">
    <Button footer>К оформлению</Button>
</a>
