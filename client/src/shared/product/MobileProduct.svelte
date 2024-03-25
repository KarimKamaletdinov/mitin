<script>
    import { category } from "$lib/function/abbreviation";
    export let product;
</script>

<figure
    class="d:hidden w-175 h-274 bg-w rounded-10 shadow-[.5rem_1rem_1rem_#00000044] overflow-hidden"
>
    <div
        class="w-full h-160 bg-no-repeat bg-center relative"
        style="background-image: url(https://cdn.mitin-fishing.ru/{product.images.split(
            ' ',
        )[0]}-175.webp);"
    >
        <div
            class="w-40 h-40 absolute right-0 top-0 rounded-10 bg-w bg-[url('/basket-product-mobile.svg')]
            bg-no-repeat bg-center"
        ></div>
    </div>
    <figcaption class="pt-12 pl-25 pr-5 text-ellipsis">
        <h5 class="pb-16 font-bold text-14 text-b">
            153₽
            <span class="strikethrough text-r text-10 border-red">180₽</span>
        </h5>
        <p class="font-semibold text-13 text-b leading-[1.25]">
            MITIN-FISHING Прикормка Карась Сербский
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
