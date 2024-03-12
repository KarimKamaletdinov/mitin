<script>
    import DesktopHeader from "./DesktopHeader.svelte";
</script>

<DesktopHeader />
<header class="block d:hidden bg-eb text-w py-14">
    <div class="ml-23 mr-15">
        <input
            class="h-50 w-full mb-14 bg-w text-lb rounded-10 text-20 placeholder:text-llb
        font-bold px-17 border-2 border-llb bg-[url('/search.svg')] bg-no-repeat bg-[right_4rem_center]
        focus:border-lb outline-none ring-0"
            placeholder="Поиск по сайту"
        />
    </div>
    <div
        class="ml-23 mr-15 h-111 bg-w bg-[url('/logo_mobile.png')] bg-no-repeat bg-[center_top_3rem] rounded-20"
    ></div>
</header>
