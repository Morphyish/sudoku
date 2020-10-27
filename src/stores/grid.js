import { get, writable } from 'svelte/store'
import { create, empty, obfuscate } from '../grid'
import { clone, getCoordinatesFromIndex, removeSymmetricalIndexes } from '../utils'

function gridStore() {
    const grid = writable(null)

    const getCell = (col, row) => {
        const snapshot = get(grid)

        return snapshot[row][col]
    }

    const generate = () => {
        const newGrid = create()
        const obfuscatedGrid = obfuscate(newGrid)
        const finishedGrid = empty(obfuscatedGrid)

        grid.set(finishedGrid)
    }

    const trim = () => {
        grid.update(snapshot => {
            const gridToTrim = clone(snapshot)
            const flattenedGrid = gridToTrim.flat()

            const filtered = flattenedGrid.filter(value => value)

            if (filtered.length <= 18) {
                return gridToTrim
            }

            let indexToRemove = -1

            while (!flattenedGrid[indexToRemove]) {
                indexToRemove = Math.floor(Math.random() * 81)
            }

            const [col, row] = getCoordinatesFromIndex(indexToRemove)
            return removeSymmetricalIndexes(gridToTrim, col, row)
        })
    }

    const setCell = (col, row, value) => {
        grid.update(snapshot => {
            const gridToFill = clone(snapshot)
            gridToFill[row][col] = value

            return gridToFill
        })
    }

    return {
        ...grid,
        generate,
        getCell,
        setCell,
        trim,
    }
}

export const grid = gridStore()
