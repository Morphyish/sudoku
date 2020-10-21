import { get, writable } from 'svelte/store'
import { removeValueFromLines, removeValueFromSquares } from '../helper'

function helperStore() {
    const helper = writable([])

    const getCell = (col, row) => {
        const snapshot = get(helper)

        return snapshot[row][col]
    }

    const init = () => {
        const grid = []
        for (let i = 0; i < 9; i++) {
            const row = []
            for (let j = 0; j < 9; j++) {
                row.push([1, 2, 3, 4, 5, 6, 7, 8, 9])
            }
            grid.push(row)
        }

        helper.set(grid)
    }

    const update = grid => {
        helper.update(snapshot => {
            let updatedHelper = [...snapshot]

            for (let col = 0; col < 9; col++) {
                for (let row = 0; row < 9; row++) {
                    if (grid[col][row] === 0) {
                        continue
                    }

                    updatedHelper = removeValueFromLines(updatedHelper, col, row, grid[col][row])
                    updatedHelper = removeValueFromSquares(updatedHelper, col, row, grid[col][row])

                    updatedHelper[col][row] = []
                }
            }

            return updatedHelper
        })
    }

    return {
        ...helper,
        getCell,
        init,
        update,
    }
}

export const helper = helperStore()
