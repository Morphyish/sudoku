import { solve } from './solve'

describe('sudoku/solve', () => {
    it('should return isSolvable to false if the board can\'t be solved', () => {
        const unsolvableBoard = [
            [9, 6, 0, 0, 0, 7, 0, 2, 0],
            [0, 0, 2, 0, 3, 0, 0, 0, 8],
            [1, 0, 0, 2, 4, 0, 0, 0, 0],
            [0, 0, 7, 0, 0, 0, 3, 0, 6],
            [0, 0, 0, 0, 8, 0, 0, 0, 0],
            [2, 0, 5, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 9, 6, 0, 0, 1],
            [7, 0, 0, 0, 5, 0, 6, 0, 0],
            [0, 3, 0, 1, 0, 0, 6, 4, 5],
        ]

        const { isSolvable, steps, methods } = solve(unsolvableBoard)

        expect(isSolvable).toBe(false)
        expect(steps).toBeUndefined()
        expect(methods).toBeUndefined()
    })

    it('should return isSolvable to true with a list of steps and methods  if the board can be solved', () => {
        const solvableBoard = [
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

        const { isSolvable, methods, steps } = solve(solvableBoard)

        expect(isSolvable).toBe(true)
        expect(steps).toEqual(expect.arrayContaining([expect.any(Object)]))
        expect(methods).toEqual(expect.arrayContaining([expect.any(String)]))
    })
})
