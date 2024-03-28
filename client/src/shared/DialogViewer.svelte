<script>
    import { onMount, getContext } from "svelte";

    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
    export let href;
    export let data = {};
    let dialogStore = getContext("dialog");
    function showDialog(e) {
        console.log(e);
        e.stopPropagation();
        dialogStore.set({
            href,
            data,
        });
    }
    let className = "";
    export { className as class };
    export let dialogDesktop = true;
    export let dialogMobile = false;
</script>

{#if (mobile && !dialogMobile) || !dialogDesktop}
    <a {href} class={className}><slot /></a>
{:else}
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={showDialog} class={className}><slot /></a>
{/if}
