<script>
    import { category } from "$lib/function/abbreviation";
    import DialogViewer from "../DialogViewer.svelte";
    export let product;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<figure
    class="hidden d:block w-272 h-424 bg-w rounded-10 overflow-hidden relative"
    on:click={() => {
        location.href = `/product/${product.id}`;
    }}
>
    <div
        class="w-242 h-229 mx-15 mt-15 bg-no-repeat bg-center bg-contain rounded-10"
        style="background-image: url(https://cdn.mitin-fishing.ru/{product.images.split(
            ' ',
        )[0]}-224.webp);"
    ></div>
    <DialogViewer
        href="/basket-add"
        data={{ current: product, target: "buy-or-basket-add" }}
        dialogMobile
    >
        <div
            class="w-50 h-50 absolute right-30 bottom-15 rounded-10 bg-b bg-[url('/basket-product-desktop.png')] bg-no-repeat bg-center"
        ></div>
    </DialogViewer>
    <figcaption class="text-ellipsis">
        <p
            class="font-semibold text-22 text-b leading-[1.25] ml-25 mr-7 mt-10 text-ellipsis line-clamp-3 mb-10"
        >
            {product.brand}<br />
            {category(product.category)}<br />
            {product.name}
        </p>
        <p class="font-bold text-15 text-b mb-13 ml-25 mr-7">
            Код товара: {product.id.toString().padStart(5, "0")}
        </p>
        <h5 class="font-bold text-22 text-b ml-39">
            {product.bulk}₽
            <span class="strikethrough text-r text-15 text-red border-red">
                {product.price}₽
            </span>
        </h5>
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
