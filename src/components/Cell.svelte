<script>
    import Helper from './Helper.svelte'

    export let cell = 0
    export let helpers = []
    export let hasError = false
    export let startingCell = false
    export let showErrors = false
    export let showHelpers = false
    export let element = null
</script>

<div class="cell" class:error={hasError && showErrors && !startingCell} class:startingCell={startingCell} bind:this={element} on:focus on:keydown tabindex="-1">
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
        font-weight: 100;
    }

    .cell:nth-child(3n) {
        border-right: 1px solid #333;
    }

    .cell:last-child {
        border-right: 0;
    }

    .startingCell {
        font-weight: 400;
    }

    .error {
        color: #D13C2F;
    }
</style>
