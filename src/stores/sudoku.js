import { get, writable } from 'svelte/store'
import { isDone, findNextStep, validate as validateGrid } from '../sudoku'
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
                const isValid = validateGrid(snapshot, get(helper))
                if (isValid) {
                    sudoku.update(state => ({
                        ...state,
                        isDone: true,
                    }))
                } else {
                    sudoku.update(state => ({
                        ...state,
                        isValid,
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
        const { nextStep, method } = findNextStep(helper)
        if (nextStep) {
            sudoku.update(state => ({
                ...state,
                tip: method,
            }))
        }
    }

    const getNextStep = () => {
        const { nextStep, method } = findNextStep(helper)
        if (nextStep) {
            sudoku.update(state => ({
                ...state,
                tip: method,
                nextStep,
            }))
        }
    }

    const applyStep = step => {
        if (step.grid) {
            for (const { col, row, value } of step.grid) {
                setCellValue(col, row, value)
            }
        }

        if (step.helpers) {
            for (const { col, row, values } of step.helpers) {
               setHelperValues(col, row, values)
            }
        }
    }

    const solveNextStep = () => {
        const { nextStep } = findNextStep(helper)
        if (nextStep) {
            applyStep(nextStep)
        }
    }

    const solveAll = () => {
        while (!isDone(get(grid))) {
            const { nextStep } = findNextStep(helper)
            if (nextStep) {
                applyStep(nextStep)
            } else {
                break;
            }
        }
    }

    const setCellValue = (col, row, value) => {
        grid.setCell(col, row, value)
    }

    const setHelperValues = (col, row, values) => {
        helper.setCell(col, row, values)
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
        setCellValue,
        solveNextStep,
        solveAll,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
