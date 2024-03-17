<script>
    import { getContext } from "svelte";
    import { imask } from "svelte-imask";
    import regions from "$lib/function/regions";
    import kit from "$lib/function/kit";
    import Select from "svelte-select";

    export let name;
    export let title;
    export let info = undefined;
    export let placeholder = "";
    export let value = "";
    export let values = [];
    export let innSize = 10;
    export let horizontal;
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
        if (!search || search.length < 2) {
            return [];
        }
        const cities = await kit.cities(values, search);
        console.log(typeof cities);
        return cities.map((x) => ({
            value: x.code,
            label: x.name,
        }));
    }
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
            placeholder="Москва"
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
            placeholder="Москва"
            class="h-50 w-full !border-lb !border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb  [grid-area:input]"
            inputStyles="font-size: 6.5rem"
        />
    {:else}
        <input
            id={name}
            {name}
            type="text"
            bind:value
            {placeholder}
            class="h-50 w-full border-lb border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb"
            style="grid-area: input"
        />
    {/if}
</div>

<style>
    :global(.selected-item) {
        font-size: 6.5rem !important;
    }
</style>
