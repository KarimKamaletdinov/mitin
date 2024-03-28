<script>
    import filter from "$lib/function/filter";
    import { onMount } from "svelte";
    const values = [
        "Кормушки",
        "Кормушки фидерные",
        "Прикормки",
        "Прикормки летние",
        "Прикормки зимние",
        "Прикормки Mitin Fishing",
        "Прикормки РыбоLove",
    ];
    let value;
    export let currentFilter = undefined;
    export let placeholder = "Найти";
    $: if (currentFilter && value == undefined) {
        value = currentFilter.search;
        console.log("SELECT VALUE AFTER SET", value);
    }
    $: console.log("SELECT VALUE", value);
    let visible;
    let filtered;
    $: filtered = [...new Set([...history.reverse(), ...values])]
        .filter(
            (x) => x ?? x.toLowerCase().startsWith(value?.toLowerCase() ?? ""),
        )
        .slice(0, 10);
    let history = [];
    onMount(() => {
        history = JSON.parse(localStorage.getItem("search-history") ?? "[]");
    });
    async function submit() {
        value ??= "";
        const n = await filter.empty();
        n.search = value;
        console.log(n);
        localStorage.setItem("filter", JSON.stringify(n));
        history = history.filter((x) => x.toLowerCase() != value.toLowerCase());
        history.push(value);
        localStorage.setItem("search-history", JSON.stringify(history));

        if (currentFilter) {
            currentFilter = n;
        } else {
            window.location.href = `/?from=catalog`;
        }
    }
</script>

<div class="h-50 w-full relative d:w-897 d:h-40 d:my-auto d:mx-70">
    <input
        class="d:w-897 d:h-40 d:my-auto d:bg-w d:text-lb d:rounded-9
    d:text-20 d:placeholder:text-c5 d:font-bold d:px-30 aria-expanded:rounded-b-0

    h-50 w-full bg-w text-lb rounded-10 text-20 placeholder:text-llb
    font-bold px-17 border-2 border-llb bg-[url('/search.svg')] bg-no-repeat bg-[right_4rem_center]
    focus:border-lb outline-none ring-0
    peer"
        aria-expanded={visible}
        {placeholder}
        bind:value
        on:change={() => {
            console.log("CHANGE", value);
            submit();
            setTimeout(() => {
                visible = false;
            }, 500);
        }}
        on:input={() => {
            visible = true;
        }}
        on:focus={() => {
            visible = true;
        }}
        on:blur={() => {
            setTimeout(() => {
                visible = false;
            }, 500);
        }}
        on:click={() => {
            if (visible && value && value != currentFilter.search) {
                console.log("CLICK", value);
                submit();
                setTimeout(() => {
                    visible = false;
                }, 500);
            } else {
                visible = true;
            }
        }}
    />
    {#if visible}
        <div
            class="absolute top-50 d:top-40
    border-2 border-llb rounded-b-10 w-full bg-w z-50"
        >
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each !value || filtered.some((x) => x.toLowerCase() == value?.toLowerCase()) ? filtered : [value ?? "", ...filtered] as item}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="px-15 py-10 w-full cursor-pointer"
                    on:click={(e) => {
                        e.stopPropagation();
                        visible = false;
                        value = item;
                        console.log("CLICK");
                        submit();
                    }}
                >
                    {item}
                </div>
            {/each}
        </div>
    {/if}
</div>
