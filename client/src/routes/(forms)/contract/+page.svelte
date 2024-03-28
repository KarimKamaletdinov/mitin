<script>
    import Input from "../../../shared/forms/Input.svelte";
    import Button from "../../../shared/forms/Button.svelte";
    import contract from "$lib/function/contract.js";
    import { getContext, onMount } from "svelte";
    import calc from "$lib/function/calc";
    import basket from "$lib/function/basket";
    import product from "$lib/function/product";
    import DesktopHeader from "../../../shared/header/DesktopHeader.svelte";
    import Product from "../../../shared/product/Product.svelte";

    getContext("title")?.set("Оформление заказа");
    let region;
    let city;
    let address;
    let comment;
    let phone;
    let surname;
    let name;
    let patronymic;
    $: console.log(city);
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
<main class="d:bg-eb overflow-clip min-h-[100vh] pt-20">
    <div
        class="grid grid-flow-col mb-20 pb-5 gap-12 overflow-x-auto overflow-y-auto w-auto
        justify-center"
    >
        {#each products as p}
            {#if p.basketCount > 0}
                <Product bind:product={p} contract />
            {/if}
        {/each}
    </div>
    <div class="d:mx-148 grid d:[grid-template-columns:auto_auto] d:gap-70">
        <div class="order-1">
            <div
                class="d:w-900 grid grid-cols-1 d:gap-20 bg-w d:px-64 px-20 d:rounded-20 d:shadow-n
            py-13"
            >
                <div
                    class="bg-lb w-550 h-[2px] mt-15 mb-8 d:hidden -mx-20"
                ></div>
                <h1 class="font-bold text-28 text-center">Доставка</h1>
                <div
                    class="bg-lb w-550 h-[2px] mt-15 mb-8 d:hidden -mx-20"
                ></div>
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
                <Input
                    name="address"
                    title="Адрес доставки"
                    {city}
                    bind:value={address}
                    horizontal
                />
                <Input
                    name="comment"
                    title="Комментарий"
                    bind:value={comment}
                    horizontal
                />
                <div class="d:hidden h-100"></div>
            </div>
            <div class="h-100"></div>
        </div>

        <div class="-order-1 d:order-2 flex justify-center flex-col">
            <div
                class="d:w-659 grid grid-cols-1 d:gap-20 bg-w d:px-64 px-20 d:rounded-20 d:shadow-n
                py-13"
            >
                <div
                    class="bg-lb w-550 h-[2px] mt-15 mb-8 d:hidden -mx-20"
                ></div>
                <h1 class="font-bold text-28 text-center">Данные получателя</h1>
                <div
                    class="bg-lb w-550 h-[2px] mt-15 mb-8 d:hidden -mx-20"
                ></div>
                <Input
                    name="phone"
                    title="Телефон"
                    bind:value={phone}
                    horizontal
                />
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
            <div>
                <div
                    class="hidden d:block mt-65 w-660 h-290 bg-w shadow-n
    rounded-20 px-55 pt-6"
                >
                    <h1 class="font-bold text-32 text-center">Ваш заказ</h1>
                    <div class="bg-lb w-550 h-[2px] mt-15 mb-8"></div>
                    <div class="flex justify-between px-40">
                        <dt class="text-22 font-bold">
                            Товары: {products.flatMap(
                                (x, i) => i + x.basketCount,
                                0,
                            )}
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

                    <Button
                        on:click={() =>
                            contract.create(
                                region,
                                city,
                                address.kind == "address" ? "Д" : "ПВ",
                                address.kind == "address"
                                    ? address.address
                                    : address.point,
                                comment,
                                phone,
                                surname,
                                name,
                                patronymic,
                            )}>К ОПЛАТЕ</Button
                    >
                </div>
            </div>
        </div>
    </div>
</main>
