<script>
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    export let visible;
    function hide() {
        visible = false;
    }
</script>

{#if visible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <button
        class="fixed h-[100vh] w-[100vw] top-0 left-0 z-10 bg-c5 bg-opacity-40"
        on:click={hide}
    >
        <div
            class="fixed w-[100vw] bottom-0 font-bold text-24 pt-23 pl-13 pb-60 text-lb text-left bg-w"
            on:click={(e) => {
                e.stopPropagation();
            }}
            transition:slide={{
                delay: 50,
                duration: 500,
                easing: quintOut,
                axis: "y",
            }}
        >
            <div class="relative w-40 h-3 left-156 top-[-4rem] bg-lb"></div>
            <slot />
        </div>
    </button>
{/if}
