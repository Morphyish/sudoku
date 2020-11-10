import { applyGridStep } from './applyGridStep'

describe('sudoku/applyGridStep', () => {
    it('should apply the update to the grid', () => {
        const grid = [
            [9, 6, 0, 0, 0, 7, 0, 2, 0],
            [0, 0, 2, 0, 3, 0, 0, 0, 8],
            [1, 0, 0, 2, 4, 0, 0, 0, 0],
            [0, 0, 7, 0, 0, 0, 3, 0, 6],
            [0, 0, 0, 0, 8, 0, 0, 0, 0],
            [2, 0, 5, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 9, 6, 0, 0, 1],
            [7, 0, 0, 0, 5, 0, 6, 0, 0],
            [0, 3, 0, 1, 0, 0, 0, 4, 5],
        ]

        const step = {
            grid: {
                col: 4,
                row: 0,
                value: 1,
            },
        }

        const newGrid = applyGridStep(grid, step.grid)

        expect(newGrid).toEqual([
            [9, 6, 0, 0, 1, 7, 0, 2, 0],
            [0, 0, 2, 0, 3, 0, 0, 0, 8],
            [1, 0, 0, 2, 4, 0, 0, 0, 0],
            [0, 0, 7, 0, 0, 0, 3, 0, 6],
            [0, 0, 0, 0, 8, 0, 0, 0, 0],
            [2, 0, 5, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 9, 6, 0, 0, 1],
            [7, 0, 0, 0, 5, 0, 6, 0, 0],
            [0, 3, 0, 1, 0, 0, 0, 4, 5],
        ])
    })

    it('should return the original array if no step is given', () => {
        const grid = [
            [9, 6, 0, 0, 0, 7, 0, 2, 0],
            [0, 0, 2, 0, 3, 0, 0, 0, 8],
            [1, 0, 0, 2, 4, 0, 0, 0, 0],
            [0, 0, 7, 0, 0, 0, 3, 0, 6],
            [0, 0, 0, 0, 8, 0, 0, 0, 0],
            [2, 0, 5, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 9, 6, 0, 0, 1],
            [7, 0, 0, 0, 5, 0, 6, 0, 0],
            [0, 3, 0, 1, 0, 0, 0, 4, 5],
        ]

        const newGrid = applyGridStep(grid)

        expect(newGrid).toBe(grid)
    })
})
