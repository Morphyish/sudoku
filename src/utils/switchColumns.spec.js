import { switchColumns } from './switchColumns'

describe('utils/switchColumns', () => {
    it('should switch any 2 columns', () => {
        const dummyGrid = [
            [1, 2, 3, 4],
            [7, 8, 9, 1],
            [4, 5, 6, 7],
            [9, 1, 2, 3],
            [6, 7, 8, 9],
            [3, 4, 5, 6],
            [8, 9, 1, 2],
        ]
        const result = switchColumns(dummyGrid, 1, 3)

        expect(result).toEqual([
            [1, 4, 3, 2],
            [7, 1, 9, 8],
            [4, 7, 6, 5],
            [9, 3, 2, 1],
            [6, 9, 8, 7],
            [3, 6, 5, 4],
            [8, 2, 1, 9],
        ])
    })
})
