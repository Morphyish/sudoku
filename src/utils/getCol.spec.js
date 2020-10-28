import { getCol } from './getCol'

describe('utils/getCol', () => {
    it('should return a specific column', () => {
        const dummyArray = [
            [0, 0, 0, 6, 0, 0, 0, 0, 0],
            [0, 7, 2, 5, 9, 1, 0, 4, 0],
            [0, 0, 1, 0, 3, 0, 0, 0, 5],
            [0, 4, 3, 2, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 4],
            [2, 8, 7, 0, 0, 6, 5, 9, 0],
            [5, 0, 0, 0, 6, 0, 4, 0, 0],
            [0, 2, 0, 0, 5, 8, 6, 3, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 0],
        ]

        const col = getCol(dummyArray, 5)

        expect(col).toEqual([0, 1, 0, 0, 0, 6, 0, 8, 7])
    })
})