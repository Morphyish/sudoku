import { shift } from './shift'

describe('utils/shift', () => {
    it('should return a shifted array', () => {
        const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const result = shift(dummyArray, 2)

        expect(result).toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7])
    })
})
