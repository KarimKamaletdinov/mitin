<script>
    import { category } from "$lib/function/abbreviation";
    import DialogViewer from "../DialogViewer.svelte";
    export let product;
    export let basket;
    export let contract;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<figure
    class="w-175 h-274 bg-w rounded-10 shadow-[.5rem_1rem_1rem_#00000044] overflow-hidden"
    on:click={() => {
        location.href = `/product/${product.id}`;
    }}
>
    <div
        class="w-full h-160 bg-no-repeat bg-center relative bg-contain"
        style="background-image: url(https://cdn.mitin-fishing.ru/{product.images.split(
            ' ',
        )[0]}-175.webp);"
    >
        <DialogViewer
            href="/basket-add"
            data={{
                current: product,
                target: contract
                    ? "basket-delete"
                    : basket
                      ? "buy-or-basket-delete"
                      : "buy-or-basket-add",
            }}
            dialogMobile
        >
            <div
                class="w-40 h-40 absolute right-0 top-0 rounded-10 bg-w bg-[url('/basket-product-mobile.svg')]
            bg-no-repeat bg-center"
            ></div>
        </DialogViewer>
    </div>
    <figcaption class="pt-12 pl-25 pr-5 text-ellipsis">
        <h5 class="pb-16 font-bold text-14 text-b">
            {product.bulk}₽
            <span class="strikethrough text-r text-10 border-red"
                >{product.price}₽</span
            >
        </h5>
        <p class="font-semibold text-13 text-b leading-[1.25]">
            {product.brand}
            {category(product.category)}
            {product.name}
        </p>
    </figcaption>
</figure>

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
