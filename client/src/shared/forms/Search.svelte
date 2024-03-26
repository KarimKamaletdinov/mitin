<script>
    import Select from "svelte-select";
    import filter from "$lib/function/filter";
    const items = [
        "Кормушки",
        "Кормушки фидерные",
        "Прикормки",
        "Прикормки летние",
        "Прикормки зимние",
    ];
    let value;
    export let currentFilter = undefined;
    export let placeholder = "Найти";
    $: if (currentFilter && value == undefined) {
        value = currentFilter.search;
        console.log("SELECT VALUE AFTER SET", value);
    }
    $: console.log("SELECT VALUE", value);
</script>

<Select
    class="d:!w-897 d:!h-40 d:!my-auto d:!mx-70 d:bg-w d:text-lb d:rounded-9
    d:text-20 d:placeholder:text-c5 d:font-bold d:px-30

    !h-50 !w-full !bg-w !text-lb !rounded-10 !text-20 !placeholder:text-llb
    !font-bold !px-17 !border-2 !border-llb !bg-[url('/search.svg')] !bg-no-repeat !bg-[right_4rem_center]
    !has-[:focus]:border-lb !outline-none !ring-0
    search"
    {placeholder}
    items={items.includes(value) ? items : [value, ...items]}
    bind:filterText={value}
    {value}
    clearable={false}
    placeholderAlwaysShow
    clearFilterTextOnBlur={false}
    on:blur={async (e) => {
        console.log(e);
        const n = await filter.empty();
        n.search = value;
        console.log(n);
        localStorage.setItem("filter", JSON.stringify(n));
        if (currentFilter) {
            currentFilter = n;
        } else {
            window.location.href = `/?from=catalog`;
        }
    }}
/>

<style>
    :global(.search > div > .selected-item) {
        font-size: 5rem !important;
    }
</style>
