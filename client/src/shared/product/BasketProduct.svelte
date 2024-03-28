<script>
    import { category } from "$lib/function/abbreviation";
    import DialogViewer from "../DialogViewer.svelte";
    import basket from "$lib/function/basket";
    export let product;
    console.log("AA");
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="grid w-1019 h-213 bg-w rounded-10 overflow-hidden relative px-55 pt-27 pb-33 gap-x-20 shadow-n"
    style="grid-template-rows: 10rem 1fr 10rem; grid-template-columns: 37.5rem 100rem 1fr 1fr"
>
    <div
        class="bg-no-repeat bg-center bg-contain rounded-10 row-span-3"
        style="background-image: url(https://cdn.mitin-fishing.ru/{product.images.split(
            ' ',
        )[0]}-224.webp);"
    ></div>
    <div
        class="font-semibold text-20 text-b leading-40 text-ellipsis line-clamp-1 cursor-pointer"
        on:click={() => {
            location.href = `/product/${product.id}`;
        }}
    >
        {product.brand}
        {category(product.category)}
        {product.name}
    </div>
    <h5 class="font-bold text-28 text-b">
        {product.bulk}₽
    </h5>
    <div class="flex h-40 justify-end">
        <button
            class="w-40 text-24 rounded-10 border-3"
            on:click={(e) => {
                e.stopPropagation();
                if (product.basketCount > 1) {
                    product.basketCount--;
                    basket.set(product.id, product.basketCount);
                }
            }}>-</button
        >
        <input
            class="min-w-37 text-center font-bold appearance-none"
            type="number"
            bind:value={product.basketCount}
            min="1"
            max={product.available}
            on:change={() => {
                if (product.basketCount < 1) {
                    product.basketCount = 1;
                }
                if (product.basketCount > product.available) {
                    product.basketCount = product.available;
                }
                basket.set(product.id, product.basketCount);
            }}
        />
        <button
            class="w-40 text-24 rounded-10 border-3"
            on:click={(e) => {
                e.stopPropagation();
                if (product.basketCount < product.available) {
                    product.basketCount++;
                    basket.set(product.id, product.basketCount);
                }
            }}>+</button
        >
    </div>
    <p class="font-bold text-16 text-llb">
        Код товара {product.id.toString().padStart(5, "0")}
    </p>
    <div>
        <span
            class="strikethrough text-r font-semibold text-20 text-red border-red"
        >
            {product.price}₽
        </span>
    </div>
    <p class="font-semibold text-16 text-llb text-right pt-10">
        в наличии {product.available}
    </p>
    <div class="col-span-2"></div>
    <div class="flex justify-end">
        <div
            class="w-22 h-30 bg-[url('/delete.svg')] bg-no-repeat bg-center
            cursor-pointer"
            on:click={(e) => {
                e.stopPropagation();
                product.basketCount = 0;
                basket.set(product.id, 0);
            }}
        ></div>
    </div>
</div>

<style>
    .strikethrough {
        position: relative;
    }
    .strikethrough:before {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        right: 0;
        border-top: 1px solid;
        border-color: inherit;
        transform: rotate(-15deg);
    }
</style>
