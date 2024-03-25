<script>
    import Input from "../../shared/forms/Input.svelte";
    import Product from "../../shared/product/Product.svelte";
    export let data;
    console.log(data);
</script>

<div class="grid grid-flow-col gap-23 bg-eb px-24 pt-32">
    <nav class="w-400 h-947 rounded-20 bg-w sticky top-112 pl-27 pr-21">
        <Input name="category" title="КАТЕГОРИЯ" values={["a", "bd"]} />
    </nav>
    <main
        class="grid grid-cols-2 d:grid-cols-5 d:gap-x12 d:gap-y-24 d:w-[351.25rem] d:p-0 w-full pl-21 pr-15
        gap-x-14 gap-y-18"
    >
        {#each data.recs as rec}
            <Product product={rec} />
        {/each}
    </main>
</div>
