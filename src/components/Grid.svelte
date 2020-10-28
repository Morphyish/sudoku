<script>
    import Cell from './Cell.svelte'
    import { errors, grid, helper, sudoku } from '../stores'
    import { getCell } from '../utils'

    const rows = Array.from(Array(9).keys())
    const columns = Array.from(Array(9).keys())

    const handleUserInput = (col, row) => event => {
        if (event.isComposing || event.keyCode === 229) {
            return
        }

        const allowedKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const key = parseInt(event.key)

        if (allowedKeys.includes(key)) {
            sudoku.handleUserInput(col, row, key)
        }
    }
</script>

<div class="grid">
    {#each rows as row}
        <div class="row">
            {#each columns as col}
                <Cell
                    cell={getCell($grid, col, row)}
                    helpers={getCell($helper, col, row)}
                    hasError={$errors.has(`${col},${row}`)}
                    showErrors={$sudoku.showErrors}
                    showHelpers={$sudoku.showHelpers}
                    on:keydown={handleUserInput(col, row)}
                />
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
