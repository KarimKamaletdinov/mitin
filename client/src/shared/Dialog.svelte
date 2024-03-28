<script>
    import Account from "../routes/(forms)/account/+page.svelte";
    import Settings from "../routes/(forms)/settings/+page.svelte";
    import BasketAdd from "./dialog/BasketAdd.svelte";
    import { slide } from "svelte/transition";
    export let href = "";
    export let data = {};
    function hideDialog() {
        console.log("a");
        href = undefined;
    }
</script>

{#if href}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="fixed top-0 left-0 w-[100vw] h-[100vh] z-60"
        on:click={hideDialog}
    >
        <div
            class="fixed d:top-[50%] left-[50%] d:bottom-auto bottom-0 -translate-x-[50%] d:-translate-y-[50%] w-400
    bg-w z-61 d:rounded-10 border-lb d:border-2 rounded-t-10"
            transition:slide
            on:click={(e) => {
                e.stopPropagation();
            }}
        >
            <div class="relative w-40 h-3 left-176 top-16 bg-lb d:hidden"></div>
            {#if href == "/account"}
                <Account {data} />
            {:else if href == "/settings"}
                <Settings {data} />
            {:else if href == "/basket-add"}
                <BasketAdd {data} close={hideDialog} />
            {/if}
        </div>
    </div>
{/if}
