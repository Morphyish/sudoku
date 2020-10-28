import { writable } from 'svelte/store'
import { create, empty, obfuscate } from '../grid'
import { clone } from '../utils'

function gridStore() {
    const grid = writable(null)

    const generate = () => {
        const newGrid = create()
        const obfuscatedGrid = obfuscate(newGrid)
        const finishedGrid = empty(obfuscatedGrid)

        grid.set(finishedGrid)
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
        setCell,
    }
}

export const grid = gridStore()
