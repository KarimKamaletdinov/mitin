<script>
    import "../app.css";
    import Info from "../shared/Info.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
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
</script>

<slot />
<Info
    visible={info != undefined}
    text={info?.text}
    x={info?.pos?.x}
    y={info?.pos?.y}
/>
