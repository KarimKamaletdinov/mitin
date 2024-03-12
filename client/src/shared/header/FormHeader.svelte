<script>
    import DesktopHeader from "./DesktopHeader.svelte";
    import { page } from "$app/stores";
    console.log(page);
    let title = page.title;
    console.log(title);
</script>

<DesktopHeader />
<header
    class="d:hidden h-65 leading-65 text-28 text-lb font-bold border-b-2 border-b-lb"
>
    <img src="/arrow.svg" alt="<" class="inline pl-19 pr-30" />{title}
</header>
