import { shuffle } from './shuffle'

describe('utils/shuffle', () => {
    it('should return an shuffled Array', () => {
        const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const result = shuffle(dummyArray)
        const set = new Set(result)

        // returns an array
        expect(result).toEqual(expect.arrayContaining([expect.any(Number)]))

        // still has as many unique values
        expect(set.size).toBe(dummyArray.length)
    })
})
