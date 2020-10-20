import { get, writable } from 'svelte/store'
import { isDone, validate as validateGrid } from '../sudoku'
import { grid } from './grid'
import { helper } from './helper'

const initialState = {
    isValid: true,
    isDone: false,
}

function sudokuStore() {
    const sudoku = writable(initialState)

    grid.subscribe(snapshot => {
        if (snapshot && isDone(snapshot)) {
            const isValid = validateGrid(snapshot)
            if (isValid) {
                sudoku.update(state => ({
                    ...state,
                    isDone: true,
                }))
            }
        }
    })

    const load = () => {
        const sudokuSnapshop = JSON.parse(localStorage.getItem('sudoku'))
        const gridSnapshop = JSON.parse(localStorage.getItem('grid'))

        if (sudokuSnapshop) {
            helper.init()
            sudoku.set(sudokuSnapshop)
            grid.set(gridSnapshop)
        } else {
            start()
        }
    }

    const start = () => {
        helper.init()
        grid.generate()

        sudoku.set({
            ...initialState,
        })
    }

    const validate = () => {
        const isValid = validateGrid(get(grid), get(helper))

        sudoku.update(state => ({
            ...state,
            isValid,
        }))
    }

    const save = () => {
        const sudokuSnapshop = get(sudoku)
        const gridSnapshot = get(grid)

        localStorage.setItem('sudoku', JSON.stringify(sudokuSnapshop))
        localStorage.setItem('grid', JSON.stringify(gridSnapshot))
    }

    return {
        ...sudoku,
        start,
        validate,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
