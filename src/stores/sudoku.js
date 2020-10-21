import { get, writable } from 'svelte/store'
import { isDone, validate as validateGrid } from '../sudoku'
import { grid } from './grid'
import { helper } from './helper'
import { easyUpdate } from '../algorithms'

const initialState = {
    isValid: true,
    isDone: false,
    nextStep: undefined
}

function sudokuStore() {
    const sudoku = writable(initialState)

    grid.subscribe(snapshot => {
        if (snapshot) {
            sudoku.update(state => ({
                ...state,
                nextStep: undefined,
            }))
            if (isDone(snapshot)) {
                const isValid = validateGrid(snapshot)
                if (isValid) {
                    sudoku.update(state => ({
                        ...state,
                        isDone: true,
                    }))
                }
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

    const solveNextStep = () => {
        const { solved, value, coordinates } = easyUpdate(get(helper))
        console.log(solved, value, coordinates)
        if (solved) {
            sudoku.update(state => ({
                ...state,
                nextStep: {
                    value,
                    coordinates,
                },
            }))
        }
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
        solveNextStep,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
