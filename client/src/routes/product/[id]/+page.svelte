<script>
    import DesktopHeader from "../../../shared/header/DesktopHeader.svelte";
    import MobileFooter from "../../../shared/header/MobileFooter.svelte";
    import { category } from "$lib/function/abbreviation";
    import Button from "../../../shared/forms/Button.svelte";
    import Product from "../../../shared/product/Product.svelte";
    import filter from "$lib/function/filter";
    import DialogViewer from "../../../shared/DialogViewer.svelte";
    export let data;
    let images = [];
    $: {
        images = data.current.images.split(" ");
        imageId = 0;
    }
    let imageId = 0;
    console.log(data.same);
</script>

<DesktopHeader />
<MobileFooter />
<main class="d:bg-eb overflow-x-hidden">
    <div class="grid d:ml-300 d:grid-flow-col grid-flow-row d:gap-75">
        <div class="d:w-600 pt-40 w-400">
            <div
                class="w-full d:h-424 h-394 bg-w bg-no-repeat bg-center bg-contain rounded-10 flex justify-between px-25"
                style="background-image: url(https://cdn.mitin-fishing.ru/{images[
                    imageId
                ]}-600.webp);"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                {#if images.length > 1}
                    <img
                        src="/arrow-left.svg"
                        class="my-auto w-17 bg-w outline outline-10 outline-w rounded-5 -outline-offset-1"
                        alt="<"
                        on:click={() => {
                            if (imageId == 0) {
                                imageId = images.length;
                            }
                            imageId--;
                        }}
                    />
                    <img
                        src="/arrow-right.svg"
                        class="my-auto w-17 bg-w outline outline-10 outline-w rounded-5 -outline-offset-1"
                        alt=">"
                        on:click={() => {
                            imageId++;
                            if (imageId == images.length) {
                                imageId = 0;
                            }
                        }}
                    />
                {/if}
            </div>
            <div class="d:hidden -mt-36 h-36 my-4 text-24 font-bold pl-17">
                {data.current.bulk}₽
                <span
                    class="text-16 font-bold strikethrough border-red text-red my-auto"
                >
                    {data.current.price}₽
                </span>
            </div>
            <div class="flex gap-10 mt-7 flex-wrap px-5 d:px-0">
                {#each data.same as item}
                    <!-- svelte-ignore a11y-role-supports-aria-props -->
                    <a
                        class="bg-w h-40 leading-40 px-20 font-bold rounded-10
                        aria-checked:outline outline-3 outline-lb
                        shadow-n d:shadow-none"
                        aria-checked={item.id == data.current.id}
                        href="/product/{item.id}"
                    >
                        {item.title}
                    </a>
                {/each}
            </div>
        </div>
        <div class="d:pt-86 pt-22 relative px-25 d:px-0">
            <h1 class="d:text-30 text-26 font-semibold text-left">
                {data.current.brand}
                <br class="d:hidden" />
                {category(data.current.category)}
                <br class="d:hidden" />
                {data.current.name}
                {data.current.taste ?? ""}
                {data.current.weight ? data.current.weight + " г" : ""}
            </h1>
            <div class="d:text-26 text-16 pt-2 d:p-0 d:font-normal font-bold">
                {#if data.current.available > 0}
                    В наличии {data.current.available}шт
                {:else}
                    <span class="text-red">Нет в наличии</span>
                {/if}
            </div>
            <div
                class="mt-18 mb-20 grid grid-cols-[62.25rem_auto] d:gap-0 gap-y-2"
            >
                <dt class="d:text-26 text-22 font-bold">Код товара</dt>
                <dd class="d:text-26 text-22 font-bold">
                    {data.current.id.toString().padStart(5, "0")}
                </dd>
                <dt class="d:text-26 text-22 font-bold">Вес</dt>
                <dd class="d:text-26 text-22 font-bold">
                    {data.current.weight ?? "-"}г
                </dd>
                <dt class="d:text-26 text-22 font-bold">Размер</dt>
                <dd class="d:text-26 text-22 font-bold">
                    {data.current.size ? `№${data.current.size}` : "-"}
                </dd>
                <dt class="d:text-26 text-22 font-bold">Количество</dt>
                <dd class="d:text-26 text-22 font-bold">
                    {data.current.count ? `${data.current.count}шт` : "-"}
                </dd>
                {#if data.current.taste}
                    <dt class="d:text-26 text-22 font-bold">Вкус</dt>
                    <dd class="d:text-26 text-22 font-bold">
                        {data.current.taste}
                    </dd>
                {/if}
            </div>
            <div class="d:flex gap-38 hidden">
                <span class="text-28 font-bold my-auto"
                    >{data.current.bulk}₽</span
                >
                <span
                    class="leading-30 text-red text-28 font-bold border-3 border-red rounded-5
                    px-10"
                >
                    -{Math.round(
                        (100 * (data.current.price - data.current.bulk)) /
                            data.current.price,
                    )}%
                </span>
                <span
                    class="text-28 font-bold strikethrough border-red text-red my-auto"
                >
                    {data.current.price}₽
                </span>
            </div>
            <div
                class="flex gap-6 content-start justify-start w-392 d:absolute d:-bottom-0
                fixed bottom-70 left-4 z-60"
            >
                <DialogViewer
                    href="/basket-add"
                    data={{ current: data.current, target: "buy" }}
                    dialogMobile
                >
                    <div
                        class="block mx-auto rounded-10
                        bg-lb h-50 font-bold text-24 leading-50 text-w text-center
                        w-193 cursor-pointer"
                    >
                        КУПИТЬ
                    </div>
                </DialogViewer>
                <DialogViewer
                    href="/basket-add"
                    data={{ current: data.current, target: "basket-add" }}
                    dialogMobile
                >
                    <div
                        class="block mx-auto rounded-10
                    bg-lb h-50 font-bold text-24 leading-50 text-w text-center
                    w-193 cursor-pointer"
                    >
                        В КОРЗИНУ
                    </div>
                </DialogViewer>
            </div>
        </div>
    </div>
    <h2 class="text-center text-28 font-bold mt-34 mb-12">
        Товары этого бренда
    </h2>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex justify-center gap-12 relative d:p-0 -ml-180">
        <img
            class="w-17 d:hidden d:static absolute left-181 top-110"
            src="/arrow-left.svg"
            alt=">"
            on:click={async () => {
                const empty = await filter.empty();
                empty.brand = [data.current.brand];
                localStorage.setItem("filter", JSON.stringify(empty));
                window.location.href = "/?from=catalog";
            }}
        />
        {#each data.brand as item}
            <Product product={item} />
        {/each}
        <img
            class="w-17 d:static absolute right-1 top-110"
            src="/arrow-right.svg"
            alt=">"
            on:click={async () => {
                const empty = await filter.empty();
                empty.brand = [data.current.brand];
                localStorage.setItem("filter", JSON.stringify(empty));
                window.location.href = "/?from=catalog";
            }}
        />
    </div>
    <div class="h-300"></div>
</main>

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
        border-top: 2px solid;
        border-color: inherit;
        transform: rotate(-15deg);
    }
</style>
