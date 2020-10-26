<script>
    import Helper from './Helper.svelte'

    export let cell = 0
    export let helpers = []
    export let showHelpers = false
</script>

<div class="cell" on:keydown tabindex="0">
    {#if cell}
        {cell}
    {:else if showHelpers}
        <Helper values={helpers} />
    {/if}
</div>

<style>
    .cell {
        height: 3rem;
        width: 3rem;
        text-align: center;
        line-height: 3rem;
        border-right: 1px solid #d7d7d7;
    }

    .cell:nth-child(3n) {
        border-right: 1px solid #333;
    }

    .cell:last-child {
        border-right: 0;
    }
</style>
