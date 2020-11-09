import { getHelpers } from '../helper'
import { sectorUpdate } from './sectorUpdate'

describe('algorithms/sectorUpdate', () => {
    it('should find an update in a row', () => {
        const grid = [
            [0, 0, 0, 0, 6, 0, 0, 9, 7],
            [7, 1, 9, 8, 4, 3, 2, 6, 5],
            [0, 6, 5, 9, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 6],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 6, 0, 0, 8, 0, 0, 0],
            [0, 0, 0, 3, 2, 5, 6, 0, 0],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [0, 3, 0, 4, 8, 6, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 3,
            row: 0,
            value: 5,
        })
    })

    it('should find an update in a col', () => {
        const grid = [
            [0, 0, 0, 0, 6, 0, 0, 9, 7],
            [7, 1, 9, 8, 0, 0, 0, 6, 5],
            [0, 6, 5, 9, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 6],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 6, 0, 0],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [0, 3, 0, 0, 0, 6, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 2,
            row: 5,
            value: 6,
        })
    })

    it('should find an update in a square', () => {
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

        const helpers = getHelpers(grid)
        const result = sectorUpdate(helpers)

        expect(result).not.toBeNull()
        expect(result.grid).toEqual({
            col: 4,
            row: 0,
            value: 6,
        })
    })

    it('should return null if it can\'t find a solution', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 9, 7],
            [7, 1, 9, 8, 0, 0, 0, 0, 5],
            [0, 0, 5, 9, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 0],
            [0, 0, 0, 6, 5, 4, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 6, 0, 0],
            [6, 5, 4, 7, 1, 9, 8, 3, 2],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = sectorUpdate(helpers)

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
        const result = sectorUpdate(helpers)

        expect(result).toBeNull()
    })
})
