<script>
    import basket from "$lib/function/basket";
    import { category } from "$lib/function/abbreviation";
    export let data;
    $: console.log(data.current);
    const images = data.current.images.split(" ");
    let count = 1;
    let inBasketCount = 0;
    export let close;
    basket.get(data.current.id).then((x) => {
        if (x) {
            count = x;
            inBasketCount = x;
        }
    });
</script>

<div
    class="h-319 grid grid-cols-2 grid-flow-row px-14 pt-43 gap-15"
    style="grid-template-rows: 33.75rem auto;"
>
    <div class="">
        <h1
            class="text-20 font-semibold text-left leading-24 text-ellipsis line-clamp-3"
        >
            {data.current.brand}<br />
            {category(data.current.category)}<br />
            {data.current.name}
        </h1>
        {#if data.current.available > 0 && data.target != "basket-delete"}
            <div
                class="h-50 outline outline-3 -outline-offset-1 rounded-10 flex w-full
            mt-10"
            >
                <button
                    class="w-60 bg-lb text-w text-24 rounded-10"
                    on:click={() => {
                        if (count > 1) {
                            count--;
                        }
                    }}>-</button
                >
                <input
                    class="w-66 text-center font-bold appearance-none"
                    type="number"
                    bind:value={count}
                    min="1"
                    max={data.current.available}
                />
                <button
                    class="w-60 bg-lb text-w text-24 rounded-10"
                    on:click={() => {
                        if (count < data.current.available) {
                            count++;
                        }
                    }}>+</button
                >
            </div>
        {/if}
    </div>
    <div
        class="h-135 bg-no-repeat bg-center bg-contain"
        style="background-image: url(https://cdn.mitin-fishing.ru/{images[0]}-224.webp);"
    ></div>
    {#if data.target != "basket-delete"}
        <div class="col-span-2 text-16 font-semibold">
            {#if data.current.available > 0}
                Количество (в наличии {data.current.available}шт)
            {:else}
                <span class="text-red text-22">Нет в наличии</span>
            {/if}
        </div>
    {/if}

    {#if data.current.available > 0}
        {#if data.target == "buy"}
            <div class="col-span-2">
                <button
                    on:click={() => {}}
                    class="block mx-auto rounded-10
            bg-lb h-50 font-bold text-24 leading-50 text-w text-center
            w-270"
                >
                    купить
                </button>
            </div>
        {:else if data.target == "basket-add" && count == inBasketCount}
            <div class="col-span-2">
                <a
                    href="/basket"
                    class="block mx-auto rounded-10
            bg-lb h-50 font-bold text-24 leading-50 text-w text-center
            w-270 cursor-pointer"
                >
                    перейти в корзину
                </a>
            </div>
        {:else if data.target == "basket-add" && count != inBasketCount}
            <div class="col-span-2">
                <button
                    on:click={async () => {
                        await basket.set(data.current.id, count);
                        inBasketCount = count;
                    }}
                    class="block mx-auto rounded-10
            bg-lb h-50 font-bold text-24 leading-50 text-w text-center
            w-270"
                >
                    ок
                </button>
            </div>
        {:else if data.target == "buy-or-basket-add"}
            <button
                class="block mx-auto rounded-10
        bg-lb h-50 font-bold text-24 leading-50 text-w text-center
        w-full cursor-pointer"
            >
                купить
            </button>
            {#if count == inBasketCount}
                <a
                    class="block mx-auto rounded-10
    bg-lb h-50 font-bold text-24 leading-50 text-w text-center
    w-full cursor-pointer"
                    href="/basket"
                >
                    в корзине
                </a>
            {:else}
                <button
                    class="block mx-auto rounded-10
    bg-lb h-50 font-bold text-24 leading-50 text-w text-center
    w-full cursor-pointer"
                    on:click={async () => {
                        await basket.set(data.current.id, count);
                        inBasketCount = count;
                    }}
                >
                    в корзину
                </button>
            {/if}
        {:else if data.target == "buy-or-basket-delete"}
            <button
                class="block mx-auto rounded-10
        bg-lb h-50 font-bold text-24 leading-50 text-w text-center
        w-full cursor-pointer"
            >
                купить
            </button>
            {#if count == inBasketCount}
                <button
                    class="block mx-auto rounded-10
    bg-lb h-50 font-bold text-24 leading-50 text-w text-center
    w-full cursor-pointer"
                    on:click={async () => {
                        count = 0;
                        data.current.basketCount = count;
                        await basket.set(data.current.id, count);
                        close();
                        location.reload();
                    }}
                >
                    удалить
                </button>
            {:else}
                <button
                    class="block mx-auto rounded-10
    bg-lb h-50 font-bold text-24 leading-50 text-w text-center
    w-full cursor-pointer"
                    on:click={async () => {
                        data.current.basketCount = count;
                        await basket.set(data.current.id, count);
                        inBasketCount = count;
                        close();
                    }}
                >
                    ок
                </button>
            {/if}
        {:else if data.target == "basket-delete"}
            <div class="col-span-2">
                <button
                    on:click={async () => {
                        count = 0;
                        data.current.basketCount = count;
                        await basket.set(data.current.id, count);
                        close();
                        location.reload();
                    }}
                    class="block mx-auto rounded-10
bg-lb h-50 font-bold text-24 leading-50 text-w text-center
w-270"
                >
                    удалить
                </button>
            </div>
        {/if}
    {/if}
</div>
