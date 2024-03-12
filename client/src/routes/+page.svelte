<script>
    import { sf } from "$lib/api";
    import Product from "../shared/product/Product.svelte";
    export let data;
    let r = "";
    async function send() {
        r = (await sf("a", "b", "c")).second;
    }
</script>

{#each data.recs as rec}
    {rec.name}<br />
{/each}
{r}

<Product />
