<script>
    import Dialog from "../Dialog.svelte";
    import Account from "../../routes/(forms)/account/+page.svelte";
</script>

<header class="hidden d:flex h-80 bg-lb justify-center">
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
    <Dialog href="/account" class="my-auto">
        <img class="w-32" src="/account.svg" alt="Аккаунт" />
        <Account slot="dialog" />
    </Dialog>
</header>
