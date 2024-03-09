<script>
    import Info from "../Info.svelte";

    export let name;
    export let title;
    export let info = undefined;
    export let type = "text";
    export let placeholder = "";
    let infoVisible = false;
    if (type == "phone") {
        placeholder = "+7(000)000-00-00";
    }
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
    <input
        id={name}
        {name}
        {type}
        {placeholder}
        class="h-50 w-full border-lb border-2 rounded-5
        text-26 font-bold px-11 placeholder:text-llb tracking-{type == 'phone'
            ? 5
            : 'auto'}"
    />
</div>
<Info bind:visible={infoVisible}>{info}</Info>
