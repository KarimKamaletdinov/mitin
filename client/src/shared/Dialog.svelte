<script>
    import Account from "../routes/(forms)/account/+page.svelte";
    import Settings from "../routes/(forms)/settings/+page.svelte";
    export let href = "";
    function hideDialog() {
        console.log("a");
        href = undefined;
    }
</script>

{#if href}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="fixed top-0 left-0 w-[100vw] h-[100vh] z-10"
        on:click={hideDialog}
    >
        <div
            class="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-400
    bg-w z-20 rounded-10 border-lb border-2"
            on:click={(e) => {
                e.stopPropagation();
            }}
        >
            {#if href == "/account"}
                <Account />
            {:else if href == "/settings"}
                <Settings />
            {/if}
        </div>
    </div>
{/if}
