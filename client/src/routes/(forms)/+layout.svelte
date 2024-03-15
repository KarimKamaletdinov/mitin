<script>
    import FormHeader from "../../shared/header/FormHeader.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    const titleStore = writable("");
    setContext("title", titleStore);
    let title = "";
    titleStore.subscribe((x) => (title = x));
</script>

<FormHeader {title} />
<slot />
