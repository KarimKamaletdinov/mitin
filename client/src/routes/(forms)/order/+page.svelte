<script>
    import Input from "../../../shared/forms/Input.svelte";
    import { getContext } from "svelte";
    getContext("title")?.set("Оформление заказа");
    let region;
    let city;
    let comment;
    let phone;
    let surname;
    let name;
    let patronymic;
    $: console.log(city);
</script>

<main class="bg-eb">
    <div class="mx-148 grid [grid-template-columns:auto_auto] gap-70">
        <div
            class="w-900 grid grid-cols-1 gap-20 bg-w px-64 rounded-20 shadow-n"
        >
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
            <Input
                name="comment"
                title="Комментарий"
                bind:value={comment}
                horizontal
            />
        </div>
        <div
            class="w-659 grid grid-cols-1 gap-20 bg-w px-64 rounded-20 shadow-n"
        >
            <Input name="phone" title="Телефон" bind:value={phone} horizontal />
            <Input
                name="surname"
                title="Фамилия"
                bind:value={surname}
                horizontal
            />
            <Input name="name" title="Имя" bind:value={name} horizontal />
            <Input
                name="patronymic"
                title="Отчество"
                bind:value={patronymic}
                horizontal
            />
        </div>
    </div>
</main>
