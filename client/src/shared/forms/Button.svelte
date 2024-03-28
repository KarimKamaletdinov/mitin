<script>
    export let small = false;
    export let footer = false;
</script>

<div
    class="fixed d:static data-[small=true]:static data-[footer=true]:bottom-70 bottom-40 left-0 w-full d:my-40 z-40"
    data-small={small}
    data-footer={footer}
>
    <button
        on:click
        class="block w-302 mx-auto rounded-10
        bg-lb h-50 font-bold text-24 leading-50 text-w text-center
        data-[small=true]:w-193"
        data-small={small}
    >
        <slot />
    </button>
</div>
