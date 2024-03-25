<script>
    import DialogViewer from "../DialogViewer.svelte";
</script>

<header class="hidden d:flex h-80 bg-lb justify-center sticky top-0 z-50">
    <div class="text-center my-auto">
        <div class="text-40 font-bold mb-[-1rem] text-w">MItIn</div>
        <div class="text-20 font-bold text-w">FISHING</div>
    </div>
    <input
        class="w-897 h-40 my-auto mx-70 bg-w text-lb rounded-9
    text-20 placeholder:text-c5 font-bold px-30"
        placeholder="Найти"
    />
    <a href="/basket" class="ml-20 mr-50 my-auto">
        <img class="w-32" src="/basket.svg" alt="Корзина" />
    </a>
    <DialogViewer href="/account" class="my-auto">
        <img class="w-32" src="/account.svg" alt="Аккаунт" />
    </DialogViewer>
</header>
