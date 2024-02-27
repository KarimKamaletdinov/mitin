<script>
    import { sf } from "$lib/api"
    import Header from '../shared/Header.svelte';
    export let data;
    let r = ''
    async function send(){
        r = (await sf('a', 'b', 'c')).second
    }
</script>
{#each data.recs as rec}
    {rec.name}<br/>
{/each}
{r}
<h1>Welcome to SvelteKit</h1>
<button on:click={send}>
    Visit kit.svelte.dev to read the documentation
</button>
<div class="bg-red-600 w-100">aa</div>