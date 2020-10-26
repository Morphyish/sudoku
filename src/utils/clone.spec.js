import { clone } from './clone'

describe('utils/clone', () => {
    it('should return an cloned Array', () => {
        const dummyArray = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
        const result = clone(dummyArray)

        // returns an array
        expect(result).toEqual(expect.any(Array))
        expect(result[0]).toEqual(expect.arrayContaining([expect.any(Number)]))

        // but a different one
        expect(result).toEqual(dummyArray)
        expect(result).not.toBe(dummyArray)
        expect(result[0]).not.toBe(dummyArray[0])
    })
})
