<script>
    import Input from "../../../shared/forms/Input.svelte";
    import customer from "$lib/function/customer";
    import { getContext } from "svelte";
    import kit from "$lib/function/kit";
    getContext("title")?.set("Оформление заказа");
    let region = { value: "02", label: "Республика Башкортостан" };
    let city;
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
                values={region.value}
                horizontal
            />
        </div>
    </div>
</main>
