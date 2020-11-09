import { sectorUpdate } from './sectorUpdate'
import { initHelpers, updateHelpers } from '../helper'

describe('algorithms/sectorUpdate', () => {
    it('should find an update in the first row', () => {
        const helpers = [
            [[1], [1], [1], [1], [1], [1, 2], [1], [1], [1]],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
        ]

        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 5,
            row: 0,
            value: 2,
        })
    })

    it('should find an update in the first col', () => {
        const helpers = [
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1, 2], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
            [[1], [], [], [], [], [], [], [], []],
        ]

        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 0,
            row: 2,
            value: 2,
        })
    })

    it('should find an update in the first square', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 9, 7],
            [7, 1, 9, 8, 0, 0, 0, 6, 5],
            [0, 0, 5, 9, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 0],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 6, 0, 0],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [0, 3, 0, 0, 0, 6, 0, 0, 0],
        ]

        const helpers = updateHelpers(initHelpers(), grid)
        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 5,
            row: 1,
            value: 6,
        })
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

        const result = sectorUpdate(helpers)

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

        const result = sectorUpdate(helpers)

        expect(result).toBeNull()
    })
})
