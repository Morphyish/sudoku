import { removeSymmetricalIndexes } from './removeSymmetricalIndexes'

describe('utils/removeSymmetricalIndexes', () => {
    it('should return an array with 2 removed values', () => {
        const dummyGrid = [
            [1, 2, 3, 4, 6],
            [7, 8, 9, 1, 2],
            [4, 5, 6, 7, 3],
            [9, 1, 2, 3, 4],
            [6, 3, 8, 2, 1],
        ]
        const result = removeSymmetricalIndexes(dummyGrid, 2, 3)

        expect(result).toEqual([
            [1, 2, 3, 4, 6],
            [7, 8, 0, 1, 2],
            [4, 5, 6, 7, 3],
            [9, 1, 0, 3, 4],
            [6, 3, 8, 2, 1],
        ])
    })

    it('should return an array with 1 removed value if the coordinates are the center', () => {
        const dummyGrid = [
            [1, 2, 3, 4, 6],
            [7, 8, 9, 1, 2],
            [4, 5, 6, 7, 3],
            [9, 1, 2, 3, 4],
            [6, 3, 8, 2, 1],
        ]
        const result = removeSymmetricalIndexes(dummyGrid, 2, 2)

        expect(result).toEqual([
            [1, 2, 3, 4, 6],
            [7, 8, 9, 1, 2],
            [4, 5, 0, 7, 3],
            [9, 1, 2, 3, 4],
            [6, 3, 8, 2, 1],
        ])
    })
})
