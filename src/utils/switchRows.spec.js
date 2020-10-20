import { switchRows } from './switchRows'

describe('utils/switchRows', () => {
    it('should switch any 2 rows', () => {
        const dummyGrid = [
            [1, 2, 3, 4],
            [7, 8, 9, 1],
            [4, 5, 6, 7],
            [9, 1, 2, 3],
            [6, 7, 8, 9],
            [3, 4, 5, 6],
            [8, 9, 1, 2],
        ]
        const result = switchRows(dummyGrid, 4, 2)

        expect(result).toEqual([
            [1, 2, 3, 4],
            [7, 8, 9, 1],
            [6, 7, 8, 9],
            [9, 1, 2, 3],
            [4, 5, 6, 7],
            [3, 4, 5, 6],
            [8, 9, 1, 2],
        ])
    })
})
