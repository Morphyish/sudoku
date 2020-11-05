<script>
    import { VirtualKeyboard } from './VirtualKeyboard'
    import Cell from './Cell.svelte'
    import { errors, grid, helper, settings, history, sudoku } from '../../stores'
    import { getCell, getCoordinatesFromIndex } from '../../utils'

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
            sudoku.fillCell(col, row, key)
            return
        }

        if (key === 0 || event.key === 'Backspace') {
            sudoku.emptyCell(col, row)
            return
        }

        const [focusedCol, focusedRow] = getCoordinatesFromIndex(focusedCell)

        switch (event.key) {
            case 'ArrowUp':
                if (focusedRow > 0) {
                    focusedCell -= 9
                    cells[focusedCell].focus()
                }
                break
            case 'ArrowDown':
                if (focusedRow < 8) {
                    focusedCell += 9
                    cells[focusedCell].focus()
                }
                break
            case 'ArrowLeft':
                if (focusedCol > 0) {
                    focusedCell -= 1
                    cells[focusedCell].focus()
                }
                break
            case 'ArrowRight':
                if (focusedCol < 8) {
                    focusedCell += 1
                    cells[focusedCell].focus()
                }
                break
            default:
                break
        }
    }

    const handleVirtualKeyboard = ({ detail }) => {
        const { key } = detail
        const [col, row] = getCoordinatesFromIndex(focusedCell)

        if (key === 0) {
            sudoku.emptyCell(col, row)
        }

        sudoku.fillCell(col, row, key)
    }

    const isStartingCell = (initialGrid, col, row) => getCell(initialGrid, col, row) !== 0

    const isHighlighted = (currentEntry, col, row) => currentEntry && currentEntry.grid[0].col === col && currentEntry.grid[0].row === row

    const focusFirstCell = () => {
        focusedCell = 0
        cells[0].focus()
    }
</script>

<div class="container">
{#if $grid}
    <div class="board" tabindex="0" on:focus={focusFirstCell}>
        {#each rows as row}
            <div class="row">
                {#each columns as col}
                    <Cell
                            cell={getCell($grid, col, row)}
                            helpers={getCell($helper, col, row)}
                            startingCell={isStartingCell($sudoku.initialGrid, col, row)}
                            highlighted={isHighlighted($history.entries[$history.currentStep], col, row)}
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
{#if $settings.showKeyboard}
    <VirtualKeyboard on:input={handleVirtualKeyboard}/>
{/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto 0;
    }

    .board {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
