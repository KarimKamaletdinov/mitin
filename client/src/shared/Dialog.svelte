<script>
    import { onMount } from "svelte";

    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
    let visible = false;
    function showDialog() {
        visible = true;
    }
    function hideDialog() {
        visible = false;
    }
    export let href;
    let className;
    export { className as class };
</script>

{#if mobile || !$$slots.dialog}
    <a {href} class={className}><slot /></a>
{:else}
    {#if visible}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="fixed top-0 left-0 w-[100vw] h-[100vh] z-10"
            on:click={hideDialog}
        >
            <div
                class="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-400
        bg-w z-20 rounded-10 border-lb border-2"
                on:click={(e) => {
                    e.stopPropagation();
                }}
            >
                <slot name="dialog" />
            </div>
        </div>
    {/if}
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={showDialog} class={className}><slot /></a>
{/if}
