<script>
    import DialogViewer from "../DialogViewer.svelte";

    export let badge = undefined;
    export let href;
</script>

<DialogViewer {href}>
    <div
        class="mx-20 mt-30 mb-40 pl-55 rounded-5 border-2
        border-lb block h-50 font-bold text-28 leading-50 relative text-b"
    >
        {#if badge}
            <div
                class="absolute size-40 rounded-20 border-2 border-red text-32 font-bold
                right-[-5rem] top-[-5rem] bg-w text-center text-red leading-[10rem]"
            >
                {badge}
            </div>
        {/if}
        <slot />
    </div>
    <svelte:fragment slot="dialog">
        <slot name="dialog" />
    </svelte:fragment>
</DialogViewer>
