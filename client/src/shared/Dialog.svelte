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
    export let href;
</script>

{#if mobile || !$$slots.dialog}
    <a {href}><slot /></a>
{:else}
    {#if visible}
        <div
            class="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-400 bg-w z-10 rounded-10 border-lb border-2"
        >
            <slot name="dialog" />
        </div>
    {/if}
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={showDialog}><slot /></a>
{/if}
