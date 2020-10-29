import { get, writable } from 'svelte/store'
import { updateHelpers } from '../helper'
import { generateNewGrid } from '../grid'
import { findNextStep, isDone, solve, validate } from '../sudoku'
import { errors } from './errors'
import { grid } from './grid'
import { helper } from './helper'
import { history } from './history'

const initialState = {
    isValid: true,
    isDone: false,
}

function sudokuStore() {
    const sudoku = writable(initialState)

    grid.subscribe(gridSnapshot => {
        if (gridSnapshot) {
            const helperSnapshot = get(helper)
            const updatedHelpers = updateHelpers(helperSnapshot, gridSnapshot)
            const { isValid, cellsWithError } = validate(gridSnapshot, updatedHelpers)

            helper.set(updatedHelpers)
            errors.set(cellsWithError)
            sudoku.update(state => ({
                ...state,
                isDone: isValid && isDone(gridSnapshot),
                isValid,
            }))
        }
    })

    const load = () => {
        const sudokuSnapshop = JSON.parse(localStorage.getItem('sudoku'))
        const gridSnapshop = JSON.parse(localStorage.getItem('grid'))

        if (sudokuSnapshop) {
            helper.reset()
            sudoku.set(sudokuSnapshop)
            grid.set(gridSnapshop)
        } else {
            start()
        }
    }

    const start = () => {
        errors.reset()
        history.reset()
        helper.reset()

        const newGrid = generateNewGrid()
        grid.set(newGrid)

        sudoku.set({
            ...initialState,
        })
    }

    const applyStep = step => {
        if (step.grid) {
            for (const { col, row, value } of step.grid) {
                grid.setCell(col, row, value)
            }
        }

        if (step.helpers) {
            for (const { col, row, values } of step.helpers) {
                helper.setCell(col, row, values)
            }
        }

        history.addEntry(step)
        history.goToLastStep()
    }

    const solveNextStep = () => {
        const nextStep = findNextStep(get(helper))
        if (nextStep) {
            applyStep(nextStep)
        }
    }

    const solveAll = () => {
        const { isSolvable, steps } = solve(get(grid))

        if (isSolvable) {
            steps.forEach(applyStep)
        } else {
            sudoku.update(state => ({
                ...state,
                isValid: false,
            }))
        }
    }

    const fillCell = (col, row, value) => {
        const step = {
            method: 'User input',
            grid: [{ col, row, value }],
        }

        applyStep(step)
    }

    const emptyCell = (col, row) => {
        const step = {
            method: 'User input',
            grid: [{ col, row, value: 0 }],
        }

        applyStep(step)
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
        fillCell,
        emptyCell,
        solveNextStep,
        solveAll,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
