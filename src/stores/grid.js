import { writable } from 'svelte/store'
import { create, empty, obfuscate } from '../grid'
import { clone, setCell as genericSetCell } from '../utils'

const initialState = Array(9).fill([Array(9).fill(0)])

function gridStore() {
    const grid = writable(initialState)

    const reset = () => grid.set(initialState)

    const generate = () => {
        const newGrid = create()
        const obfuscatedGrid = obfuscate(newGrid)
        const finishedGrid = empty(obfuscatedGrid)

        grid.set(finishedGrid)
    }

    const setCell = (col, row, value) => {
        grid.update(snapshot => {
            const clonedGrid = clone(snapshot)
            genericSetCell(clonedGrid, col, row, value)

            return clonedGrid
        })
    }

    return {
        ...grid,
        reset,
        generate,
        setCell,
    }
}

export const grid = gridStore()
