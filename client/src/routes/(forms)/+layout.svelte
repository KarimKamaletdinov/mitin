<script>
    import { getContext } from "svelte";
    import FormHeader from "../../shared/header/FormHeader.svelte";
    const titleStore = getContext("title");
    let title = "";
    titleStore.subscribe((x) => (title = x));
</script>

<FormHeader {title} />
<slot />
