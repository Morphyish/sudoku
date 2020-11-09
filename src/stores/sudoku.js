import { GridFactory } from '../../workers'
import { get, writable } from 'svelte/store'
import { getHelpers } from '../helper'
import { applyGridStep, solveNextCell, isDone, solve, validate } from '../sudoku'
import { clone, getCell } from '../utils'
import { errors } from './errors'
import { grid } from './grid'
import { helper } from './helper'
import { history } from './history'

const initialState = {
    loading: false,
    isValid: true,
    isDone: false,
    initialGrid: Array(9).fill(Array(9).fill(0)),
    difficulty: 0,
    methods: [],
}

let factory

function sudokuStore() {
    const sudoku = writable(initialState)

    grid.subscribe(gridSnapshot => {
        if (gridSnapshot) {
            const helpers = getHelpers(gridSnapshot)
            const { isValid, cellsWithError } = validate(gridSnapshot, helpers)

            helper.set(helpers)
            errors.set(cellsWithError)
            sudoku.update(state => ({
                ...state,
                isDone: isValid && isDone(gridSnapshot),
            }))
        }
    })

    const load = () => {
        const sudokuSnapshop = JSON.parse(localStorage.getItem('sudoku'))
        const gridSnapshop = JSON.parse(localStorage.getItem('grid'))

        if (sudokuSnapshop) {
            sudoku.set(sudokuSnapshop)
            grid.set(gridSnapshop)
        }
    }

    const empty = () => {
        errors.reset()
        history.reset()
        grid.reset()
        sudoku.set(initialState)
    }

    const start = () => {
        errors.reset()
        history.reset()

        sudoku.update(state => ({
            ...state,
            loading: true,
        }))

        factory = new GridFactory()
        factory.onprogress = ({ message }) => {
            console.log(message)
        }
        factory.onsuccess = ({ grid: newGrid, methods, difficulty, nbOfCells }) => {
            console.log('methods', methods)
            console.log('difficulty', difficulty)
            console.log('nbOfCells', nbOfCells)
            console.log('~~~~~~~~~~~~~~~~~~~~~~')

            grid.set(newGrid)
            sudoku.set({
                ...initialState,
                initialGrid: clone(newGrid),
                difficulty,
                methods,
                loading: false,
            })
        }
        factory.start()
    }

    const restart = () => {
        errors.reset()
        history.reset()
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
        grid.update(snapshot => applyGridStep(snapshot, step.grid))
        history.addEntry(step)
    }

    const solveNextStep = () => {
        const { isSolvable, step } = solveNextCell(get(grid))

        if (isSolvable) {
            applyStep(step)
        } else {
            sudoku.update(state => ({
                ...state,
                isValid: false,
            }))
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
            methods: ['User input'],
            grid: { col, row, value },
        }
        const initialGrid = get(sudoku).initialGrid

        if (getCell(initialGrid, col, row) === 0) {
            applyStep(step)
        }
    }

    const emptyCell = (col, row) => {
        const step = {
            methods: ['User input'],
            grid: { col, row, value: 0 },
        }
        const initialGrid = get(sudoku).initialGrid

        if (getCell(initialGrid, col, row) === 0) {
            applyStep(step)
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
        empty,
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
