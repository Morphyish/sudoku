import { removeDuplicates } from './removeDuplicates'

describe('utils/removeDuplicates', () => {
    it('should remove any duplicates in an array', () => {
        const array = [1, 2, 3, 4, 7, 8, 9, 1, 4, 5, 6, 7, 9, 1, 2, 3, 8, 9, 1, 2,]
        const result = removeDuplicates(array)

        expect(result).toEqual([1, 2, 3, 4, 7, 8, 9, 5, 6])
    })
})
