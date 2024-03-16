<script>
    import Button from "../../../shared/forms/Button.svelte";
    import Input from "../../../shared/forms/Input.svelte";
    import customer from "$lib/function/customer";
    import { getContext } from "svelte";
    import kit from "$lib/function/kit";
    import regions from "$lib/function/regions";
    getContext("title")?.set("Настройки");
    let phone;
    let state;
    let inn;
    let document;

    async function save() {
        console.log("A");
        if (phone && state && (state === "ФЛ" || (inn && document))) {
            await customer.update("phone", "state", "a", inn, document);
        }
    }
    kit.calc("02", "Уфа");
</script>

<main class="bg-eb">
    <div class="mx-148 grid grid-cols-2 gap-70">
        <div
            class="w-900 grid gap-55 bg-w px-64"
            style="grid-template: 'input label' auto / 50% 50%;"
        >
            <Input
                name="region"
                title="Регион"
                bind:value={phone}
                values={Object.getOwnPropertyNames(regions).map((x) => ({
                    value: x,
                    label: regions[x],
                }))}
            />
        </div>
    </div>
</main>
