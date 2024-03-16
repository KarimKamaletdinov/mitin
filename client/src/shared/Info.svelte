<script>
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount } from "svelte";
    export let visible;
    export let text;
    export let x = 0;
    export let y = 0;

    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });

    function hide() {
        visible = false;
    }
</script>

{#if visible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <button
        class="fixed h-[100vh] w-[100vw] top-0 left-0 z-10 bg-c5 bg-opacity-40 d:h-full d:w-full"
        on:click={hide}
    >
        <div
            class="fixed w-[100vw] bottom-0 font-bold text-24 pt-23 pl-13 pb-60 text-lb text-left bg-w
            d:w-396 d:rounded-10 dialog d:bottom-auto"
            on:click={(e) => {
                e.stopPropagation();
            }}
            transition:slide={{
                delay: 50,
                duration: 500,
                easing: quintOut,
                axis: "y",
            }}
            style={mobile
                ? ""
                : `left: ${x}px; top: ${y}px; transform: translate(-45%, 12rem);`}
        >
            <div
                class="relative w-40 h-3 left-156 top-[-4rem] bg-lb d:hidden"
            ></div>
            {@html text}
        </div>
    </button>
{/if}
