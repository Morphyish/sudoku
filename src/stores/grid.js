import { get, writable } from 'svelte/store'
import { create, obfuscate } from '../grid'
import { clone, removeSymmetricalIndexes } from '../utils'
import { helper } from './helper'

function gridStore() {
    const grid = writable(null)

    grid.subscribe(snapshot => {
        if (snapshot) {
            helper.updateFrom(clone(snapshot))
        }
    })

    const getCell = (col, row) => {
        const snapshot = get(grid)

        return snapshot[row][col]
    }

    const generate = () => {
        const newGrid = create()
        const obfuscatedGrid = obfuscate(newGrid)

        grid.set(obfuscatedGrid)
    }

    const getCoordinatesFromIndex = index => {
        const col = index % 9
        const row = index / 9 | 0

        return [col, row]
    }

    const trim = () => {
        helper.init()
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
