<script>
    import Input from "../../../shared/forms/Input.svelte";
    import { getContext } from "svelte";
    getContext("title")?.set("Оформление заказа");
    let region;
    let city;
    let comment;
    $: console.log(city);
</script>

<main class="bg-eb">
    <div class="mx-148 grid grid-cols-2 gap-70">
        <div class="w-900 grid grid-cols-1 gap-20 bg-w px-64">
            <Input
                name="region"
                title="Регион"
                bind:value={region}
                horizontal
            />
            <Input
                name="city"
                title="Город/населённый пункт"
                values={region?.value}
                bind:value={city}
                horizontal
            />
            <Input name="address" title="Адрес доставки" {city} horizontal />
            <Input name="comment" title="Комментарий" {comment} horizontal />
        </div>
    </div>
</main>
