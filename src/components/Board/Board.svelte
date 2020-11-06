<script>
    import { VirtualKeyboard } from './VirtualKeyboard'
    import Cell from './Cell.svelte'
    import { errors, grid, helper, settings, history, sudoku } from '../../stores'
    import { getCell, getCoordinatesFromIndex } from '../../utils'

    const cells = []
    let focusedCell = -1
    let focusedCol = -1
    let focusedRow = -1

    const rows = Array.from(Array(9).keys())
    const columns = Array.from(Array(9).keys())

    const resetFocus = () => {
        focusedCell = -1
        focusedCol = -1
        focusedRow = -1
    }

    const handleFocus = (col, row) => () => {
        focusedCell = 9 * row + col
        focusedCol = col
        focusedRow = row
    }

    const handleBlur = event => {
        if (event.relatedTarget?.dataset?.focus !== 'virtual-keyboard') {
            resetFocus()
        }
    }

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

        if (focusedCell === -1) return

        if (key === 0) {
            sudoku.emptyCell(focusedCol, focusedRow)
        } else {
            sudoku.fillCell(focusedCol, focusedRow, key)
        }

        resetFocus()
    }

    const isStartingCell = (initialGrid, col, row) => getCell(initialGrid, col, row) !== 0

    const isHighlighted = (currentEntry, col, row) => currentEntry?.grid.col === col && currentEntry?.grid.row === row

    const focusFirstCell = () => {
        resetFocus()
        cells[0].focus()
    }
</script>

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
                            isFocused={col === focusedCol && row === focusedRow}
                            on:blur={handleBlur}
                            on:focus={handleFocus(col, row)}
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

<style>
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
