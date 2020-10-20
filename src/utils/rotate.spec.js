import { rotate } from './rotate'

describe('utils/rotate', () => {
    it('should rotate twice clockwise', () => {
        const dummyGrid = [
            [1, 2, 3, 4],
            [7, 8, 9, 1],
            [4, 5, 6, 7],
            [9, 1, 2, 3],
            [8, 9, 1, 2],
        ]
        const result = rotate(dummyGrid, 2)

        expect(result).toEqual([
            [2, 1, 9, 8],
            [3, 2, 1, 9],
            [7, 6, 5, 4],
            [1, 9, 8, 7],
            [4, 3, 2, 1],
        ])
    })

    it('should rotate once counterclockwise', () => {
        const dummyGrid = [
            [1, 2, 3, 4],
            [7, 8, 9, 1],
            [4, 5, 6, 7],
            [9, 1, 2, 3],
            [8, 9, 1, 2],
        ]
        const result = rotate(dummyGrid, 1, true)

        expect(result).toEqual([
            [4, 1, 7, 3, 2],
            [3, 9, 6, 2, 1],
            [2, 8, 5, 1, 9],
            [1, 7, 4, 9, 8],
        ])
    })
})
