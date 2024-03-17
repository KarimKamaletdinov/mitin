<script>
    import DesktopProduct from "./DesktopProduct.svelte";
    import MobileProduct from "./MobileProduct.svelte";
    import { onMount } from "svelte";

    let mobile;
    onMount(() => {
        mobile = window.innerWidth <= 576;
    });
</script>

{#if mobile === true}
    <MobileProduct />
{:else if mobile === false}
    <DesktopProduct />
{/if}
