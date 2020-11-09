import { getHelpers } from '../helper'
import { checkNakedTuple } from './checkNakedTuple'

describe('algorithms/checkNakedTuple', () => {
    describe('naked pairs', () => {
        it('should find an update in a row', () => {
            const grid = [
                [4, 0, 0, 0, 0, 0, 9, 3, 8],
                [0, 3, 2, 0, 9, 4, 1, 0, 0],
                [0, 9, 5, 3, 0, 0, 2, 4, 0],
                [3, 7, 0, 6, 0, 9, 0, 0, 4],
                [5, 2, 9, 0, 0, 1, 6, 7, 3],
                [6, 0, 4, 7, 0, 3, 0, 9, 0],
                [9, 5, 7, 0, 0, 8, 3, 0, 0],
                [0, 0, 3, 9, 0, 0, 4, 0, 0],
                [2, 4, 0, 0, 3, 0, 7, 0, 9],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 3,
                    row: 0,
                    values: [2, 5],
                },
                {
                    col: 4,
                    row: 0,
                    values: [2, 5, 7],
                },
                {
                    col: 5,
                    row: 0,
                    values: [2, 5, 7],
                },
            ])
        })

        it('should find an update in a col', () => {
            const grid = [
                [0, 8, 0, 0, 9, 0, 0, 3, 0],
                [0, 3, 0, 0, 0, 0, 0, 6, 9],
                [9, 0, 2, 0, 6, 3, 1, 5, 8],
                [0, 2, 0, 8, 0, 4, 5, 9, 0],
                [8, 5, 1, 9, 0, 7, 0, 4, 6],
                [3, 9, 4, 6, 0, 5, 8, 7, 0],
                [5, 6, 3, 0, 4, 0, 9, 8, 7],
                [2, 0, 0, 0, 0, 0, 0, 1, 5],
                [0, 1, 0, 0, 5, 0, 0, 2, 0],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 3,
                    row: 0,
                    values: [1, 2, 4, 5],
                },
                {
                    col: 3,
                    row: 1,
                    values: [1, 2, 4, 5],
                },
                {
                    col: 3,
                    row: 2,
                    values: [4],
                },
            ])
        })

        it('should find an update in a square', () => {
            const grid = [
                [5, 6, 3, 0, 4, 0, 9, 8, 7],
                [2, 0, 0, 0, 0, 0, 0, 1, 5],
                [0, 1, 0, 0, 5, 0, 0, 2, 0],
                [0, 8, 0, 0, 9, 0, 0, 3, 0],
                [0, 3, 0, 0, 0, 0, 0, 6, 9],
                [9, 0, 2, 0, 6, 3, 1, 5, 8],
                [0, 2, 0, 8, 0, 4, 5, 9, 0],
                [8, 5, 1, 9, 0, 7, 0, 4, 6],
                [3, 9, 4, 6, 0, 5, 8, 7, 0],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 2,
                    row: 1,
                    values: [8, 9],
                },
                {
                    col: 2,
                    row: 2,
                    values: [8, 9],
                },
            ])
        })
    })

    describe.skip('naked triples', () => {
        it('should find an update', () => {
            const grid = [
                [3, 7, 4, 0, 0, 8, 2, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [2, 6, 1, 0, 0, 3, 7, 0, 8],
                [4, 0, 8, 0, 7, 0, 0, 2, 9],
                [0, 0, 0, 0, 0, 2, 0, 0, 4],
                [0, 2, 0, 8, 5, 4, 0, 0, 7],
                [0, 9, 3, 0, 0, 0, 6, 1, 2],
                [0, 0, 0, 2, 0, 0, 4, 0, 3],
                [6, 4, 2, 1, 3, 0, 0, 7, 5],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            console.log(helpers[1])

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 3,
                    row: 1,
                    values: [4, 6, 7],
                },
                {
                    col: 5,
                    row: 1,
                    values: [1, 6, 7],
                },
                {
                    col: 6,
                    row: 1,
                    values: [3],
                },
                {
                    col: 7,
                    row: 1,
                    values: [3, 4],
                },
            ])
        })
    })

    describe.skip('naked quads', () => {
        it('should find an update', () => {
            const grid = [
                [3, 7, 4, 0, 0, 8, 2, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [2, 6, 1, 0, 0, 3, 7, 0, 8],
                [4, 0, 8, 0, 7, 0, 0, 2, 9],
                [0, 0, 0, 0, 0, 2, 0, 0, 4],
                [0, 2, 0, 8, 5, 4, 0, 0, 7],
                [0, 9, 3, 0, 0, 0, 6, 1, 2],
                [0, 0, 0, 2, 0, 0, 4, 0, 3],
                [6, 4, 2, 1, 3, 0, 0, 7, 5],
            ]

            const helpers = getHelpers(grid)
            const result = checkNakedTuple(helpers)

            expect(result).not.toBeNull()
            expect(result.helpers).toEqual([
                {
                    col: 6,
                    row: 1,
                    values: [3, 5, 9],
                },
                {
                    col: 7,
                    row: 0,
                    values: [5, 9],
                },
                {
                    col: 7,
                    row: 1,
                    values: [3, 4, 5, 9],
                },
            ])
        })
    })

    it('should return null if it finds a solution but it doesn\'t update any cells', () => {
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
        const result = checkNakedTuple(helpers)

        expect(result).toBeNull()
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
