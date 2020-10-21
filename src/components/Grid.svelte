<script>
    import Cell from './Cell.svelte'

    const rows = Array.from(Array(9).keys())
    const columns = Array.from(Array(9).keys())
</script>

<div class="grid">
    {#each rows as row}
        <div class="row">
            {#each columns as col}
                <Cell {row} {col} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .grid {
        font-size: 2rem;
        color: #333;
    }

    .row {
        display: flex;
        border-bottom: 1px solid #d7d7d7;
    }

    .row:nth-child(3n) {
        border-bottom: 1px solid #333;
    }

    .row:last-child {
        border-bottom: 0;
    }
</style>
