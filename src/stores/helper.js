import { get, writable } from 'svelte/store'
import { removeValueFromLines, removeValueFromSquares } from '../helper'

function helperStore() {
    const helper = writable([])

    const getCell = (x, y) => {
        const snapshot = get(helper)

        return snapshot[y][x]
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

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (grid[i][j] === 0) {
                        continue
                    }

                    updatedHelper = removeValueFromLines(updatedHelper, i, j, grid[i][j])
                    updatedHelper = removeValueFromSquares(updatedHelper, i, j, grid[i][j])

                    updatedHelper[i][j] = []
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
