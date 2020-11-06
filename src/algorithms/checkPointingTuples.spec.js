import { initHelpers, updateHelpers } from '../helper'
import { checkPointingTuples } from './checkPointingTuples'

describe('algorithms/checkPointingTuples', () => {
    it('should remove helpers in a col', () => {
        const grid = [
            [9, 3, 0, 0, 5, 0, 0, 0, 0],
            [2, 0, 0, 6, 3, 0, 0, 9, 5],
            [8, 5, 6, 0, 0, 2, 0, 0, 0],
            [0, 0, 3, 1, 8, 0, 5, 7, 0],
            [0, 0, 5, 0, 2, 0, 9, 8, 0],
            [0, 8, 0, 0, 0, 5, 4, 0, 0],
            [0, 0, 0, 8, 0, 0, 1, 5, 9],
            [5, 0, 8, 2, 1, 0, 0, 0, 4],
            [0, 0, 0, 5, 6, 0, 0, 0, 8],
        ]

        const helpers = updateHelpers(initHelpers(), grid)
        const result = checkPointingTuples(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 5,
                row: 3,
                values: [4, 6],
            },
            {
                col: 5,
                row: 4,
                values: [4, 6, 7],
            },
        ])
    })

    it('should remove helpers in a row', () => {
        const grid = [
            [0, 1, 7, 9, 0, 3, 6, 0, 0],
            [0, 0, 0, 0, 8, 0, 0, 0, 0],
            [9, 0, 0, 0, 0, 0, 5, 0, 7],
            [0, 7, 2, 0, 1, 0, 4, 3, 0],
            [0, 0, 0, 4, 0, 2, 0, 7, 0],
            [0, 6, 4, 3, 7, 0, 2, 5, 0],
            [7, 0, 1, 0, 0, 0, 0, 6, 5],
            [0, 0, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 5, 6, 0, 1, 7, 2, 0],
        ]

        const helpers = updateHelpers(initHelpers(), grid)
        const result = checkPointingTuples(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 0,
                row: 1,
                values: [2, 4, 5, 6],
            },
            {
                col: 1,
                row: 1,
                values: [2, 4, 5],
            },
            {
                col: 2,
                row: 1,
                values: [6],
            },
        ])
    })

    it('should return null if it can\'t find a solution', () => {
        const helpers = [
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
            [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
        ]

        const result = checkPointingTuples(helpers)

        expect(result).toBeNull()
    })

    it('should return null if helpers are empty', () => {
        const helpers = [
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = checkPointingTuples(helpers)

        expect(result).toBeNull()
    })
})
