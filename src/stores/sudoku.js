import { get, writable } from 'svelte/store'
import { isDone, nextStep, validate as validateGrid } from '../sudoku'
import { grid } from './grid'
import { helper } from './helper'

const initialState = {
    isValid: true,
    isDone: false,
    showHelpers: false,
    tip: undefined,
    nextStep: undefined,
}

function sudokuStore() {
    const sudoku = writable(initialState)

    grid.subscribe(snapshot => {
        if (snapshot) {
            sudoku.update(state => ({
                ...state,
                tip: undefined,
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

    const toggleHelpers = () => {
        sudoku.update(state => ({
            ...state,
            showHelpers: !state.showHelpers,
        }))
    }

    const getTip = () => {
        const { solved, method } = nextStep(get(helper))
        if (solved) {
            sudoku.update(state => ({
                ...state,
                tip: method,
            }))
        }
    }

    const getNextStep = () => {
        const { solved, method, value, coordinates: [row, col] } = nextStep(get(helper))
        if (solved) {
            sudoku.update(state => ({
                ...state,
                tip: method,
                nextStep: {
                    value,
                    coordinates: {
                        row: row + 1,
                        col: col + 1,
                    },
                },
            }))
        }
    }

    const solveNextStep = () => {
        const { solved, value, coordinates: [row, col] } = nextStep(get(helper))
        if (solved) {
            grid.setValueOf(col, row, value)
        }
    }

    const solveAll = () => {
        while (!isDone(get(grid))) {
            const { solved, value, coordinates: [row, col] } = nextStep(get(helper))
            if (solved) {
                grid.setValueOf(col, row, value)
            } else {
                break;
            }
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
        toggleHelpers,
        getTip,
        getNextStep,
        solveNextStep,
        solveAll,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
