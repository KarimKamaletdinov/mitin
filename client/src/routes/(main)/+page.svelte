<script>
    import { page } from "$app/stores";
    import Input from "../../shared/forms/Input.svelte";
    import Product from "../../shared/product/Product.svelte";
    import MobileFooter from "../../shared/header/MobileFooter.svelte";
    import filter from "$lib/function/filter";
    import { onMount } from "svelte";
    import DesktopHeader from "../../shared/header/DesktopHeader.svelte";
    import Search from "../../shared/forms/Search.svelte";
    let products = [];
    let options;
    let currentFilter;
    const fromCatalog = $page.url.searchParams.get("from") == "catalog";
    async function update(f) {
        if (!f) {
            return;
        }
        console.log(f);
        products = await filter.query(f);
        options = await filter.options(f);
        localStorage.setItem("filter", JSON.stringify(f));
    }
    onMount(() => {
        console.log("MOUNT");
        let f = localStorage.getItem("filter");
        if (f) {
            console.log("LS");
            currentFilter = JSON.parse(f);
        } else {
            console.log("NO LS");
            filter.empty().then((x) => {
                currentFilter = x;
            });
        }
    });
    $: update(currentFilter);
</script>

<DesktopHeader bind:currentFilter />
<MobileFooter />

{#if fromCatalog}
    <header class="block d:hidden pt-14">
        <div class="ml-21 mr-15">
            <Search placeholder="Поиск по сайту" bind:currentFilter />
        </div>
        <div class="flex justify-between px-24 h-43">
            {#if currentFilter}
                <Input name="order" bind:value={currentFilter.order} title="" />
            {/if}
            <a href="/catalog" class="text-16 flex gap-5">
                <span class="my-auto">Фильтр</span>
                <img src="/filter.svg" class="w-40 my-auto" alt="" />
            </a>
        </div>
    </header>
{:else}
    <header class="block d:hidden bg-eb py-14">
        <div class="ml-21 mr-15">
            <Search placeholder="Поиск по сайту" bind:currentFilter />
        </div>
    </header>
    <div class="bg-eb pb-14">
        <div
            class="ml-21 mr-15 h-111 bg-w bg-[url('/logo_mobile.png')] bg-no-repeat bg-[center_top_3rem] rounded-20"
        ></div>
    </div>
{/if}
<div class="grid grid-flow-col gap-23 bg-eb d:px-24 d:pt-32 pt-9">
    <nav class="hidden d:block w-400 h-947 rounded-20 bg-w sticky top-112">
        {#if currentFilter && options}
            <Input name="order" title="" bind:value={currentFilter.order} />
            <div class="pl-27 pr-21">
                <Input
                    name="category"
                    title="КАТЕГОРИЯ"
                    values={options.category}
                    bind:value={currentFilter.category}
                />
                <Input
                    name="brand"
                    title="БРЕНД"
                    values={options.brand}
                    bind:value={currentFilter.brand}
                />
                <Input
                    name="price"
                    title="ЦЕНА"
                    values={options.price}
                    bind:value={currentFilter.price}
                />
            </div>
        {/if}
    </nav>
    <main
        class="grid grid-cols-2 d:grid-cols-5 d:gap-x12 d:gap-y-24 d:w-[351.25rem] d:p-0 w-full pl-21 pr-15
        gap-x-14 gap-y-18"
    >
        {#each products as product}
            <Product {product} />
        {/each}
    </main>
</div>
