import { getHelpers } from '../helper'
import { checkIntersectionRemoval } from './checkIntersectionRemoval'

describe('algorithms/checkIntersectionRemoval', () => {
    it('should find a pointing tuple in a col', () => {
        const grid = [
            [8, 0, 0, 0, 0, 0, 1, 5, 9],
            [2, 1, 0, 5, 0, 8, 0, 0, 4],
            [5, 6, 0, 0, 0, 0, 0, 0, 8],
            [0, 5, 0, 9, 3, 0, 0, 0, 0],
            [6, 3, 0, 2, 0, 0, 0, 9, 5],
            [0, 0, 2, 8, 5, 6, 0, 0, 0],
            [1, 8, 0, 0, 0, 3, 5, 7, 0],
            [0, 2, 0, 0, 0, 5, 9, 8, 0],
            [0, 0, 5, 0, 8, 0, 4, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = checkIntersectionRemoval(helpers)

        // console.log(helpers)

        expect(result).not.toBeNull()
        expect(result.helpers).toEqual([
            {
                col: 2,
                row: 6,
                values: [4, 6],
            },
            {
                col: 2,
                row: 7,
                values: [4, 6, 7],
            },
        ])
    })

    it('should find a pointing tuple in a row', () => {
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

        const helpers = getHelpers(grid)
        const result = checkIntersectionRemoval(helpers)

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
        const result = checkIntersectionRemoval(helpers)

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
        const result = checkIntersectionRemoval(helpers)

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

        const result = checkIntersectionRemoval(helpers)

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

        const result = checkIntersectionRemoval(helpers)

        expect(result).toBeNull()
    })
})
