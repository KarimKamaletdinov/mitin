<script>
    import Input from "../../../shared/forms/Input.svelte";
    import filter from "$lib/function/filter";
    import Button from "../../../shared/forms/Button.svelte";
    import Search from "../../../shared/forms/Search.svelte";
    import { onMount } from "svelte";
    let options = {
        category: [],
        brand: [],
        price: {
            from: 0,
            to: 0,
        },
        available: false,
    };
    let currentFilter = {
        category: [],
        brand: [],
        price: {
            from: 0,
            to: 0,
        },
        available: false,
    };

    async function update(f) {
        options = await filter.options(f);
    }
    $: update(currentFilter);
    onMount(() => {
        let f = localStorage.getItem("filter");
        if (f) {
            currentFilter = JSON.parse(f);
        } else {
            filter.empty().then((x) => {
                currentFilter = x;
            });
        }
    });
</script>

<header class="block d:hidden bg-w py-14">
    <div class="ml-21 mr-15">
        <Search placeholder="Поиск по сайту" bind:currentFilter />
    </div>
</header>

<div class="gap-23 bg-w px-22 d:pt-32">
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
<Button
    on:click={() => {
        localStorage.setItem("filter", JSON.stringify(currentFilter));
        window.location.href = "/?from=catalog";
    }}>ПРИМЕНИТЬ</Button
>
