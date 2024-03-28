<script>
    import DialogViewer from "../DialogViewer.svelte";
    import Search from "../forms/Search.svelte";
    export let currentFilter = undefined;
</script>

<header class="hidden d:flex h-80 bg-lb justify-center sticky top-0 z-50">
    <a class="text-center my-auto" href="/">
        <div class="text-40 font-bold mb-[-1rem] text-w">MItIn</div>
        <div class="text-20 font-bold text-w">FISHING</div>
    </a>
    <Search bind:currentFilter />
    <a href="/basket" class="ml-20 mr-50 my-auto">
        <img class="w-32" src="/basket.svg" alt="Корзина" />
    </a>
    <DialogViewer href="/account" class="my-auto">
        <img class="w-32" src="/account.svg" alt="Аккаунт" />
    </DialogViewer>
</header>
