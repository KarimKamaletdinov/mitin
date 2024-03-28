<script>
    import BasketProduct from "./BasketProduct.svelte";
    import DesktopProduct from "./DesktopProduct.svelte";
    import MobileProduct from "./MobileProduct.svelte";
    import { onMount } from "svelte";
    export let product;
    export let basket = false;
    export let contract = false;
    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
</script>

{#if contract}
    <MobileProduct bind:product contract />
{:else if basket}
    {#if mobile === true}
        <MobileProduct bind:product basket />
    {:else if mobile === false}
        <BasketProduct bind:product />
    {/if}
{:else if mobile === true}
    <MobileProduct {product} />
{:else if mobile === false}
    <DesktopProduct {product} />
{/if}
