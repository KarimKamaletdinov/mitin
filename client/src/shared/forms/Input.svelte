<script>
    import { getContext } from "svelte";
    import { imask } from "svelte-imask";
    import regions from "$lib/function/regions";
    import kit from "$lib/function/kit";
    import Select from "svelte-select";
    import Page from "../../routes/(forms)/order/+page.svelte";

    export let name;
    export let title;
    export let info = undefined;
    export let placeholder = "";
    export let value = "";
    export let values = [];
    export let innSize = 10;
    export let horizontal = false;
    export let city = undefined;
    let calc = {};
    let infoStore = getContext("info");

    function showInfo() {
        const rect = this.getBoundingClientRect();
        infoStore.set({
            visible: true,
            text: info,
            pos: {
                x: Math.floor(rect.left),
                y: Math.floor(rect.top),
            },
        });
    }

    async function loadOptions(search) {
        console.log(search);
        if (!search || search.length < 2 || !values) {
            return [];
        }
        const cities = await kit.cities(values, search);
        console.log(typeof cities);
        return cities.map((x) => ({
            value: x.code,
            label: x.name,
        }));
    }

    function recalc(city) {
        calc.address = undefined;
        calc.point = undefined;
        if (name == "address" && city) {
            kit.addresses(city).then((x) => {
                values = x.map((y) => ({
                    value: y.id,
                    label: y.value,
                }));
            });
            kit.calc(city, true).then((x) => {
                calc.address = x;
            });
            kit.calc(city, false).then((x) => {
                calc.point = x;
            });
        }
    }

    $: recalc(city);

    if (name == "address") {
        value = {
            kind: "address",
            address: undefined,
            point: undefined,
        };
    }

    $: if (name == "address") {
        if (value.kind == "address") {
            value.point = undefined;
        } else if (!value.point && values && values.length > 0) {
            value.point = values[0].value;
        }
    }

    $: console.log(value);
</script>

<div
    class="grid"
    style={horizontal
        ? "grid-template: 'input label' auto / 50% 50%; gap: 17rem"
        : "grid-template: 'label' auto 'input' auto; gap: 3rem;"}
>
    <label
        for={name}
        class="h-40 relative leading-40 font-bold text-22 text-lb w-full block"
        style="grid-area: label; {horizontal &&
            'height: 12.5rem; line-height: 12.5rem'}"
    >
        {title}
        {#if info}
            <button
                class="absolute size-40 rounded-20 border-2 border-red text-32 font-bold
            right-0 top-0 bg-w text-center text-red leading-40"
                on:click={showInfo}
            >
                ?
            </button>
        {/if}
    </label>
    {#if name == "phone"}
        <input
            id={name}
            {name}
            type="tel"
            value="+7"
            use:imask={{
                mask: "{+7}(000)000-00-00",
                lazy: false,
            }}
            on:complete={(e) => {
                value = e.detail.unmaskedValue;
            }}
            class="h-50 w-full border-lb border-2 rounded-5
        text-26 font-bold px-11 placeholder:text-llb tracking-5"
            style="grid-area: input"
        />
    {:else if name == "state"}
        <ul
            class="h-50 w-full border-lb border-2 rounded-5
        text-26 font-bold flex justify-between text-lb"
            style="grid-area: input"
        >
            {#each Object.getOwnPropertyNames(values) as v}
                <li class="inline-block h-48 flex-grow">
                    <input
                        type="radio"
                        id={`${name}-${v}`}
                        {name}
                        value={v}
                        bind:group={value}
                        class="hidden peer text-26 font-bold text-lb"
                    />
                    <label
                        class="inline-block peer-checked:bg-lb peer-checked:text-w h-48 leading-48 px-11 w-full text-center
                        text-lb"
                        for={`${name}-${v}`}
                    >
                        {values[v]}
                    </label>
                </li>
            {/each}
        </ul>
    {:else if name == "inn"}
        <input
            id={name}
            {name}
            type="text"
            value=""
            use:imask={{
                mask: "0".repeat(innSize),
                lazy: false,
            }}
            on:complete={(e) => {
                value = e.detail.unmaskedValue;
            }}
            class="h-50 w-full border-lb border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb tracking-10 text-center"
            style="grid-area: input"
        />
    {:else if name == "document"}
        <label
            for={`${name}-upload`}
            class="block h-50 leading-50 w-full border-lb border-2 rounded-5
        text-24 font-bold px-11 placeholder:text-llb text-center"
            style="grid-area: input"
        >
            ЗАГРУЗИТЬ
        </label>
        <input
            id={`${name}-upload`}
            {name}
            type="file"
            class="hidden"
            on:change={(e) => {
                value = e.target.files[0];
            }}
        />
    {:else if name == "region"}
        <Select
            id={`${name}-upload`}
            {name}
            bind:value
            items={Object.getOwnPropertyNames(regions).map((x) => ({
                value: x,
                label: regions[x],
            }))}
            placeholder="Выберите регион"
            class="h-50 w-full !border-lb !border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb  [grid-area:input]"
            inputStyles="font-size: 6.5rem"
        />
    {:else if name == "city"}
        <Select
            id={`${name}-upload`}
            {loadOptions}
            {name}
            bind:value
            placeholder="Выберите город"
            class="h-50 w-full !border-lb !border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb  [grid-area:input]"
            inputStyles="font-size: 6.5rem"
        />
    {:else if name == "address"}
        <div class="[grid-area:input]">
            <label
                class="block border-2 border-lb has-[:checked]:bg-lb has-[:checked]:text-w rounded-5 mb-10"
            >
                <input
                    type="radio"
                    name="address-kind"
                    value="address"
                    class="hidden peer"
                    bind:group={value.kind}
                />
                <div
                    class="h-50 text-28 font-bold text-center leading-50 peer-checked:text-w"
                >
                    ДО АДРЕСА
                </div>
                <input
                    id={name}
                    {name}
                    type="text"
                    bind:value={value.address}
                    {placeholder}
                    class="h-50 w-full border-y-lb border-y-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb"
                    style="grid-area: input;"
                    on:click={() => {
                        value.kind = "address";
                        value.point = undefined;
                    }}
                />
                <div
                    class="text-28 font-bold text-center peer-checked:text-w mt-5 mb-3"
                >
                    КИТ
                </div>
                <div
                    class="text-18 font-bold text-center peer-checked:text-w mb-12"
                >
                    {calc.address?.time ?? "..."} дней {calc.address?.cost ??
                        "..."} ₽
                </div>
            </label>
            {#if values && values.length > 0}
                <label class="block border-2 border-lb rounded-5 mb-10">
                    <div
                        class="h-50 text-28 font-bold text-center leading-50 has-[:checked]:bg-lb has-[:checked]:text-w"
                    >
                        ДО ПУНКТА ВЫДАЧИ
                        <input
                            type="radio"
                            name="address-kind"
                            value="point"
                            class="hidden peer"
                            bind:group={value.kind}
                        />
                    </div>
                    <div class="border-t-2 border-t-lb bg-w">
                        <div class="h-60 flex justify-between px-18">
                            <span
                                class="text-28 font-bold text-center leading-60"
                            >
                                КИТ
                            </span>
                            <span
                                class="text-20 font-bold text-center mb-12 leading-60"
                            >
                                {calc.point?.time ?? "..."} дней {calc.point
                                    ?.cost ?? "..."} ₽
                            </span>
                        </div>
                        <ul>
                            {#each values as point}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <li
                                    class="block"
                                    on:click={() => {
                                        if (value.kind != "point") {
                                            value.kind = "point";
                                        }
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id={`${name}-${point.value}`}
                                        {name}
                                        value={point.value}
                                        bind:group={value.point}
                                        class="hidden peer text-26 font-bold text-lb"
                                    />
                                    <label
                                        class="inline-block peer-checked:bg-lb peer-checked:text-w min-h-48 py-10 px-15 w-full
                                text-lb font-bold text-22"
                                        for={`${name}-${point.value}`}
                                    >
                                        {point.label}
                                    </label>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </label>
            {/if}
        </div>
    {:else if name == "comment"}
        <textarea
            id={name}
            {name}
            type="text"
            bind:value
            placeholder="Пример: Позвонить за 3 часа до приезда курьера"
            class="min-h-80 w-full border-lb border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb py-9"
            style="grid-area: input"
        ></textarea>
    {:else}
        <input
            id={name}
            {name}
            type="text"
            bind:value
            {placeholder}
            class="h-50 w-full border-lb border-2 rounded-5
            text-24 font-bold px-11 placeholder:text-llb text-lb"
            style="grid-area: input"
        />
    {/if}
</div>

<style>
    :global(.selected-item) {
        font-size: 6.5rem !important;
    }
</style>
