<script>
    import Helper from './Helper.svelte'

    import { grid } from '../stores'

    export let x = 0
    export let y = 0

    let cell = 0
    $: $grid, cell = grid.getCell(x, y)

    const printCoordinates = event => {
        if (event.isComposing || event.keyCode === 229) {
            return
        }

        const allowedKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const key = parseInt(event.key)

        if (allowedKeys.includes(key)) {
            grid.setValueOf(x, y, key)
        }
    }
</script>

<div class="cell" on:keydown={printCoordinates} tabindex="0">
    {#if cell}
        {cell}
    {:else}
        <Helper {x} {y} />
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
