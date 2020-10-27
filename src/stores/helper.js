import { get, writable } from 'svelte/store'
import { removeValueFromCell, removeValueFromLines, removeValueFromSquares } from '../helper'
import { clone } from '../utils'

function helperStore() {
    const helper = writable([])

    const getCell = (col, row) => {
        return get(helper)[row][col]
    }

    const setCell = (col, row, values) => {
        helper.update(snapshot => {
            const updatedHelper = clone(snapshot)

            updatedHelper[row][col] = values

            return updatedHelper
        })
    }

    const removeFromCell =(col, row, value) => {
        helper.update(snapshot => {
            const updatedHelper = clone(snapshot)

            updatedHelper[row][col] = removeValueFromCell(updatedHelper[row][col], value)

            return updatedHelper
        })
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

    const updateFrom = grid => {
        helper.update(snapshot => {
            let updatedHelper = clone(snapshot)

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
        setCell,
        removeFromCell,
        init,
        updateFrom,
    }
}

export const helper = helperStore()
