import { isDone } from './isDone'

describe('sudoku/isDone', () => {
    it('should return true if the board is filled', () => {
        const dummyBoard = [
            [0, 0, 0, 6, 0, 0, 0, 0, 0],
            [0, 7, 2, 5, 9, 1, 0, 4, 0],
            [0, 0, 1, 0, 3, 0, 0, 0, 5],
            [0, 4, 3, 2, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 4],
            [2, 8, 7, 0, 0, 6, 5, 9, 0],
            [5, 0, 0, 0, 6, 0, 4, 0, 0],
            [0, 2, 0, 0, 5, 8, 6, 3, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 0],
        ]

        expect(isDone(dummyBoard)).toBe(false)
    })

    it('should return true if the board is filled', () => {
        const dummyBoard = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
        ]

        expect(isDone(dummyBoard)).toBe(true)
    })
})
