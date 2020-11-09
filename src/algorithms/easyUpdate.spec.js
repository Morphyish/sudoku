import { getHelpers } from '../helper'
import { easyUpdate } from './easyUpdate'

describe('algorithms/easyUpdate', () => {
    it('should return a grid update if it can find an easy update', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 9, 7],
            [0, 1, 9, 8, 0, 0, 0, 0, 5],
            [0, 0, 5, 0, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 6, 0, 0],
            [6, 0, 4, 0, 0, 9, 8, 3, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = easyUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 4,
            row: 7,
            value: 1,
        })
    })

    it('should return null if it can\'t find an update', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 9, 7],
            [0, 1, 9, 8, 0, 0, 0, 0, 5],
            [0, 0, 5, 0, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 6, 0, 0],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = easyUpdate(helpers)

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
        const result = easyUpdate(helpers)

        expect(result).toBeNull()
    })
})
