<script>
    import DesktopProduct from "./DesktopProduct.svelte";
    import MobileProduct from "./MobileProduct.svelte";
    import { onMount } from "svelte";
    export let product;
    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
</script>

<a href="/product/{product.id}">
    {#if mobile === true}
        <MobileProduct {product} />
    {:else if mobile === false}
        <DesktopProduct {product} />
    {/if}
</a>
