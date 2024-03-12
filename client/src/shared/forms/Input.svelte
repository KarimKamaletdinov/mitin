<script>
    import Info from "../Info.svelte";
    import { imask } from "svelte-imask";

    export let name;
    export let title;
    export let info = undefined;
    export let placeholder = "";
    export let value = "";
    export let values = [];
    export let innSize = 10;
    let infoVisible = false;
</script>

<div class="mt-12 mb-30 mx-20">
    <label
        for={name}
        class="h-40 mb-13 relative leading-40 font-bold text-22 text-lb w-full block"
    >
        {title}
        {#if info}
            <button
                class="absolute size-40 rounded-20 border-2 border-red text-32 font-bold
            right-0 top-0 bg-w text-center text-red leading-40"
                on:click={() => {
                    infoVisible = true;
                }}
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
        />
    {:else if name == "state"}
        <ul
            class="h-50 w-full border-lb border-2 rounded-5
        text-26 font-bold flex justify-between text-lb"
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
        />
    {:else if name == "document"}
        <label
            for={`${name}-upload`}
            class="block h-50 leading-50 w-full border-lb border-2 rounded-5
        text-24 font-bold px-11 placeholder:text-llb text-center"
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
    {:else}
        <input
            id={name}
            {name}
            type="text"
            bind:value
            {placeholder}
            class="h-50 w-full border-lb border-2 rounded-5
            text-26 font-bold px-11 placeholder:text-llb text-lb"
        />
    {/if}
</div>
<Info bind:visible={infoVisible}>{info}</Info>
