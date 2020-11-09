import { getHelpers } from '../helper'
import { checkNakedTuple } from './checkNakedTuple'

describe('algorithms/checkNakedTuple', () => {
    describe('naked triples', () => {
        it('should find an update in a col', () => {
            const grid = [
                [0, 3, 2, 4, 0, 0, 0, 0, 6],
                [0, 7, 6, 0, 0, 2, 9, 0, 4],
                [0, 4, 1, 8, 0, 0, 3, 0, 2],
                [0, 0, 0, 0, 0, 8, 0, 2, 1],
                [2, 0, 0, 7, 0, 5, 0, 0, 3],
                [0, 8, 3, 0, 2, 4, 0, 0, 0],
                [0, 2, 7, 0, 0, 0, 6, 4, 0],
                [0, 0, 0, 2, 0, 0, 1, 0, 7],
                [0, 0, 0, 9, 4, 7, 2, 3, 0],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 0,
                    row: 3,
                    values: [4, 6, 7],
                },
                {
                    col: 0,
                    row: 5,
                    values: [1, 6, 7],
                },
                {
                    col: 0,
                    row: 6,
                    values: [1, 3],
                },
                {
                    col: 0,
                    row: 7,
                    values: [3, 4, 6],
                },
                {
                    col: 0,
                    row: 8,
                    values: [1, 6],
                },
            ])
        })

        it('should find an update in a row', () => {
            const grid = [
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [3, 7, 4, 0, 0, 8, 2, 0, 0],
                [2, 6, 1, 0, 0, 3, 7, 0, 0],
                [4, 0, 8, 0, 7, 0, 0, 2, 9],
                [0, 0, 0, 0, 0, 2, 0, 0, 4],
                [0, 2, 0, 8, 5, 4, 0, 0, 7],
                [0, 9, 3, 0, 0, 0, 6, 1, 2],
                [0, 0, 0, 2, 0, 0, 4, 0, 3],
                [6, 4, 2, 1, 3, 0, 0, 7, 0],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 3,
                    row: 0,
                    values: [4, 6, 7],
                },
                {
                    col: 5,
                    row: 0,
                    values: [1, 6, 7],
                },
                {
                    col: 6,
                    row: 0,
                    values: [1, 3],
                },
                {
                    col: 7,
                    row: 0,
                    values: [3, 4, 6],
                },
                {
                    col: 8,
                    row: 0,
                    values: [1, 6],
                },
            ])
        })

        it('should find an update in a square', () => {
            const grid = [
                [0, 0, 9, 0, 5, 6, 0, 0, 0],
                [0, 4, 0, 0, 8, 0, 0, 6, 0],
                [0, 0, 0, 4, 7, 0, 0, 0, 0],
                [2, 9, 4, 5, 1, 3, 0, 0, 6],
                [6, 0, 0, 8, 4, 2, 3, 1, 9],
                [3, 0, 0, 6, 9, 7, 2, 5, 4],
                [7, 3, 0, 1, 6, 4, 0, 0, 5],
                [7, 0, 0, 7, 3, 5, 0, 0, 1],
                [4, 0, 0, 9, 2, 8, 6, 3, 7],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 1,
                    row: 0,
                    values: [2, 7],
                },
                {
                    col: 1,
                    row: 2,
                    values: [2, 6],
                },
                {
                    col: 2,
                    row: 1,
                    values: [2, 3, 7],
                },
                {
                    col: 2,
                    row: 2,
                    values: [2, 3, 6],
                },
            ])
        })
    })

    describe('naked quads', () => {
        it('should find an update', () => {
            const grid = [
                [0, 0, 0, 0, 3, 0, 0, 8, 6],
                [0, 0, 0, 0, 2, 0, 0, 4, 0],
                [0, 9, 0, 0, 7, 8, 5, 2, 0],
                [3, 7, 1, 8, 5, 6, 2, 9, 4],
                [9, 0, 0, 1, 4, 2, 3, 7, 5],
                [4, 0, 0, 3, 9, 7, 6, 1, 8],
                [2, 0, 0, 7, 0, 3, 8, 5, 9],
                [0, 3, 9, 2, 0, 5, 4, 6, 7],
                [7, 0, 0, 9, 0, 4, 1, 3, 2],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 1,
                    row: 0,
                    values: [2, 4],
                },
                {
                    col: 2,
                    row: 0,
                    values: [2, 4, 7],
                },
                {
                    col: 2,
                    row: 1,
                    values: [3, 7],
                },
                {
                    col: 2,
                    row: 2,
                    values: [3, 4],
                },
            ])
        })
    })

    it('should return null if it finds a solution but it doesn\'t update any cells', () => {
        const grid = [
            [0, 4, 0, 5, 6, 0, 3, 9, 7],
            [7, 0, 9, 0, 4, 3, 0, 6, 5],
            [3, 6, 5, 9, 7, 0, 4, 0, 0],
            [4, 0, 0, 0, 3, 7, 9, 5, 6],
            [0, 9, 3, 6, 5, 4, 7, 0, 0],
            [5, 7, 6, 0, 9, 0, 0, 4, 3],
            [9, 0, 0, 3, 0, 5, 6, 7, 4],
            [6, 5, 4, 7, 0, 9, 0, 3, 0],
            [0, 3, 7, 4, 0, 6, 5, 0, 9],
        ]

        const helpers = getHelpers(grid)
        const result = checkNakedTuple(helpers)

        expect(result).toBeNull()
    })

    it('should return null if it can\'t find a solution', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        const helpers = getHelpers(grid)
        const result = checkNakedTuple(helpers)

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
        const result = checkNakedTuple(helpers)

        expect(result).toBeNull()
    })
})
