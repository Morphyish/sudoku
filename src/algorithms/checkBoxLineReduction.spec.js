import { getHelpers } from '../helper'
import { checkBoxLineReduction } from './checkBoxLineReduction'

describe('algorithms/checkBoxLineReduction', () => {
    it('should find a box line reduction in a col', () => {
        const grid = [
            [8, 0, 3, 0, 0, 7, 0, 1, 6],
            [0, 0, 0, 8, 0, 0, 0, 9, 0],
            [0, 6, 0, 0, 0, 1, 8, 7, 0],
            [3, 0, 0, 0, 0, 0, 0, 4, 8],
            [0, 8, 2, 0, 0, 9, 6, 5, 0],
            [6, 5, 0, 0, 0, 0, 0, 3, 9],
            [0, 2, 0, 9, 0, 0, 0, 6, 0],
            [9, 3, 6, 0, 0, 2, 0, 8, 0],
            [5, 1, 0, 6, 0, 0, 9, 2, 4],
        ]

        const helpers = getHelpers(grid)
        const result = checkBoxLineReduction(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 0,
                row: 1,
                values: [1, 2, 7],
            },
            {
                col: 0,
                row: 2,
                values: [2],
            },
            {
                col: 2,
                row: 1,
                values: [1, 5, 7],
            },
            {
                col: 2,
                row: 2,
                values: [5, 9],
            },
        ])
    })

    it('should find a box line reduction in a row', () => {
        const grid = [
            [0, 0, 7, 0, 1, 6, 8, 0, 3],
            [8, 0, 0, 0, 9, 0, 0, 0, 0],
            [0, 0, 1, 8, 7, 0, 0, 6, 0],
            [0, 0, 0, 2, 4, 8, 3, 0, 0],
            [0, 0, 9, 6, 5, 0, 0, 8, 2],
            [0, 0, 0, 0, 3, 9, 6, 5, 0],
            [9, 0, 0, 0, 6, 0, 0, 2, 0],
            [0, 0, 2, 0, 8, 0, 9, 3, 6],
            [6, 0, 0, 9, 2, 4, 5, 1, 0],
        ]

        const helpers = getHelpers(grid)
        const result = checkBoxLineReduction(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 0,
                row: 2,
                values: [3, 4, 5],
            },
            {
                col: 1,
                row: 1,
                values: [3, 4, 5, 6],
            },
            {
                col: 1,
                row: 2,
                values: [3, 4, 5, 9],
            },
        ])
    })

    it('should return null if it can\'t find a solution', () => {
        const grid = [
            [2, 4, 0, 5, 6, 1, 3, 9, 7],
            [7, 1, 9, 0, 4, 3, 2, 6, 5],
            [3, 6, 5, 9, 7, 2, 4, 0, 1],
            [4, 0, 2, 1, 3, 7, 9, 5, 6],
            [1, 9, 3, 6, 5, 4, 7, 2, 0],
            [5, 7, 6, 2, 9, 0, 1, 4, 3],
            [9, 2, 1, 3, 0, 5, 6, 7, 4],
            [6, 5, 4, 7, 1, 9, 0, 3, 2],
            [0, 3, 7, 4, 2, 6, 5, 1, 9],
        ]

        const helpers = getHelpers(grid)
        const result = checkBoxLineReduction(helpers)

        expect(result).toBeNull()
    })

    it('should return null if helpers are empty', () => {
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
        const result = checkBoxLineReduction(helpers)

        expect(result).toBeNull()
    })
})
