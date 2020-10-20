import { get, writable } from 'svelte/store'
import { create, obfuscate } from '../grid'
import { removeSymmetricalIndexes } from '../utils'
import { helper } from './helper'

function gridStore() {
    const grid = writable(null)

    grid.subscribe(snapshot => {
        if (snapshot) {
            helper.update([...snapshot])
        }
    })

    const getCell = (x, y) => {
        const snapshot = get(grid)

        return snapshot[y][x]
    }

    const generate = () => {
        const newGrid = create()
        const obfuscatedGrid = obfuscate(newGrid)

        grid.set(obfuscatedGrid)
    }

    const getCoordinatesFromIndex = index => {
        const x = index % 9
        const y = index / 9 | 0

        return [x, y]
    }

    const trim = () => {
        helper.init()
        grid.update(snapshot => {
            const gridToTrim = [...snapshot]
            const flattenedGrid = gridToTrim.flat()

            const filtered = flattenedGrid.filter(value => value)

            if (filtered.length <= 18) {
                return gridToTrim
            }

            let indexToRemove = -1

            while (!flattenedGrid[indexToRemove]) {
                indexToRemove = Math.floor(Math.random() * 81)
            }

            const [x, y] = getCoordinatesFromIndex(indexToRemove)
            return removeSymmetricalIndexes(gridToTrim, x, y)
        })
    }

    const setValueOf = (x, y, value) => {
        grid.update(snapshot => {
            const gridToFill = [...snapshot]
            gridToFill[y][x] = value

            return gridToFill
        })
    }

    return {
        ...grid,
        generate,
        getCell,
        setValueOf,
        trim,
    }
}

export const grid = gridStore()
