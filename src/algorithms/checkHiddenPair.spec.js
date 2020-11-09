import { getHelpers } from '../helper'
import { checkHiddenPair } from './checkHiddenPair'

describe('algorithms/checkHiddenPair', () => {
    it('should find an update in the first row', () => {
        const helpers = [
            [[1, 4], [2, 4], [5, 7, 9], [], [1, 5, 9], [], [3, 6, 8], [4, 6, 8, 9], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = checkHiddenPair(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 6,
                row: 0,
                values: [6, 8],
            },
            {
                col: 7,
                row: 0,
                values: [6, 8],
            },
        ])
    })

    it('should find an update in the first col', () => {
        const helpers = [
            [[1, 4], [], [], [], [], [], [], [], []],
            [[2, 4], [], [], [], [], [], [], [], []],
            [[5, 7, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[1, 5, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[3, 6, 8], [], [], [], [], [], [], [], []],
            [[4, 6, 8, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = checkHiddenPair(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 0,
                row: 6,
                values: [6, 8],
            },
            {
                col: 0,
                row: 7,
                values: [6, 8],
            },
        ])
    })

    it('should find an update in the first square', () => {
        const helpers = [
            [[1, 4], [2, 4], [5, 7, 9], [], [], [], [], [], []],
            [[], [1, 5, 9], [], [], [], [], [], [], []],
            [[3, 6, 8], [4, 6, 8, 9], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = checkHiddenPair(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 0,
                row: 2,
                values: [6, 8],
            },
            {
                col: 1,
                row: 2,
                values: [6, 8],
            },
        ])
    })

    it('should return null if it finds a solution but it doesn\'t update any cells', () => {
        const helpers = [
            [[1, 4], [], [], [], [], [], [], [], []],
            [[2, 4], [], [], [], [], [], [], [], []],
            [[5, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[5, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[2, 3, 8], [], [], [], [], [], [], [], []],
            [[4, 6, 8, 9], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = checkHiddenPair(helpers)

        expect(result).toBeNull()
    })

    it('should return null if it can\'t find a solution', () => {
        const grid = [
            [0, 4, 0, 5, 6, 1, 3, 9, 7],
            [7, 1, 9, 0, 4, 3, 0, 6, 5],
            [3, 6, 5, 9, 7, 0, 4, 0, 1],
            [4, 0, 0, 1, 3, 7, 9, 5, 6],
            [1, 9, 3, 6, 5, 4, 7, 0, 0],
            [5, 7, 6, 0, 9, 0, 1, 4, 3],
            [9, 0, 1, 3, 0, 5, 6, 7, 4],
            [6, 5, 4, 7, 1, 9, 0, 3, 0],
            [0, 3, 7, 4, 0, 6, 5, 1, 9],
        ]

        const helpers = getHelpers(grid)
        const result = checkHiddenPair(helpers)

        expect(result).toBeNull()
    })

    it('should return null if the grid is full', () => {
        const grid = [
            [8, 4, 2, 5, 6, 1, 3, 9, 7],
            [7, 1, 9, 8, 4, 3, 2, 6, 5],
            [3, 6, 5, 9, 7, 2, 4, 8, 1],
            [4, 2, 8, 1, 3, 7, 9, 5, 6],
            [1, 9, 3, 6, 5, 4, 7, 2, 8],
            [5, 7, 6, 2, 9, 8, 1, 4, 3],
            [9, 8, 1, 3, 2, 5, 6, 7, 4],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [2, 3, 7, 4, 8, 6, 5, 1, 9],
        ]

        const helpers = getHelpers(grid)
        const result = checkHiddenPair(helpers)

        expect(result).toBeNull()
    })
})
