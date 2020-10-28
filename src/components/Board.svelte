<script>
    import Cell from './Cell.svelte'
    import { errors, grid, helper, settings, sudoku } from '../stores'
    import { getCell, getCoordinatesFromIndex } from '../utils'

    const cells = []
    let focusedCell = 0

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
            return
        }

        const [col, row] = getCoordinatesFromIndex(focusedCell)

        switch (event.key) {
            case 'ArrowUp':
                if (row > 0) {
                    focusedCell -= 9
                    cells[focusedCell].focus()
                }
                return
            case 'ArrowDown':
                if (row < 8) {
                    focusedCell += 9
                    cells[focusedCell].focus()
                }
                return
            case 'ArrowLeft':
                if (col > 0) {
                    focusedCell -= 1
                    cells[focusedCell].focus()
                }
                return
            case 'ArrowRight':
                if (col < 8) {
                    focusedCell += 1
                    cells[focusedCell].focus()
                }
                return
            default:
                break
        }
    }

    const focusFirstCell = () => {
        focusedCell = 0
        cells[0].focus()
    }
</script>

{#if $grid}
    <div class="grid" tabindex="0" on:focus={focusFirstCell}>
        {#each rows as row}
            <div class="row">
                {#each columns as col}
                    <Cell
                            cell={getCell($grid, col, row)}
                            helpers={getCell($helper, col, row)}
                            hasError={$errors.has(`${col},${row}`)}
                            showErrors={$settings.showErrors}
                            showHelpers={$settings.showHelpers}
                            on:focus={() => focusedCell = 9 * row + col}
                            on:keydown={handleUserInput(col, row)}
                            bind:element={cells[9 * row + col]}
                    />
                {/each}
            </div>
        {/each}
    </div>
{/if}

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
