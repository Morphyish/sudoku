import { get, writable } from 'svelte/store'
import { updateHelpers } from '../helper'
import { generateNewGrid } from '../grid'
import { findNextStep, isDone, solve, validate } from '../sudoku'
import { clone } from '../utils'
import { errors } from './errors'
import { grid } from './grid'
import { helper } from './helper'
import { history } from './history'

const initialState = {
    isValid: true,
    isDone: false,
    initialGrid: Array(9).fill(Array(9).fill(0)),
    difficulty: 0,
    methodsUsed: [],
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

        const { grid: newGrid, difficulty, methods } = generateNewGrid()

        console.log(methods)

        grid.set(newGrid)
        sudoku.set({
            ...initialState,
            initialGrid: clone(newGrid),
            difficulty,
            methods,
        })
    }

    const restart = () => {
        errors.reset()
        history.reset()
        helper.reset()
        sudoku.update(snapshot => {
            grid.set(clone(snapshot.initialGrid))

            return {
                ...snapshot,
                isValid: true,
                isDone: false,
            }
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
        restart,
        fillCell,
        emptyCell,
        solveNextStep,
        solveAll,
        save,
        load,
    }
}

export const sudoku = sudokuStore()
