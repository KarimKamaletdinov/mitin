<script>
    import DesktopHeader from "../shared/header/DesktopHeader.svelte";
    import "../app.css";
    import Info from "../shared/Info.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import Dialog from "../shared/Dialog.svelte";
    const titleStore = writable("");
    setContext("title", titleStore);
    titleStore.subscribe((x) => {
        if (browser) {
            document.title = `${x} - Mitin Fishing`;
        }
    });

    const infoStore = writable(undefined);
    setContext("info", infoStore);
    let info = "";
    infoStore.subscribe((x) => {
        info = x;
    });

    const dialogStore = writable({
        href: "",
        data: {},
    });
    setContext("dialog", dialogStore);
    let dialog = {
        href: "",
        data: {},
    };
    dialogStore.subscribe((x) => {
        console.log("AAA", x);
        dialog = x;
    });
</script>

<slot />
<Dialog href={dialog.href} data={dialog.data} />

<Info
    visible={info != undefined}
    text={info?.text}
    x={info?.pos?.x}
    y={info?.pos?.y}
/>
