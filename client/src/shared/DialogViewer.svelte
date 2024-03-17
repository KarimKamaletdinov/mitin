<script>
    import { onMount, getContext } from "svelte";

    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
    export let href;
    let dialogStore = getContext("dialog");
    function showDialog() {
        dialogStore.set(href);
    }
    let className = "";
    export { className as class };
</script>

{#if mobile}
    <a {href} class={className}><slot /></a>
{:else}
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={showDialog} class={className}><slot /></a>
{/if}
