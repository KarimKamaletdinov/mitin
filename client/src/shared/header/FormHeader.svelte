<script>
    export let title;

    function back() {
        window.history.back();
    }
</script>

<header
    class="d:hidden h-65 leading-65 text-28 text-lb font-bold border-b-2 border-b-lb"
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img src="/arrow.svg" alt="<" class="inline pl-19 pr-30" on:click={back} />
    {title}
</header>
