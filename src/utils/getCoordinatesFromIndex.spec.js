import { getCoordinatesFromIndex } from './getCoordinatesFromIndex'

describe('utils/getCoordinatesFromIndex', () => {
    it('should return a set of coordinates based on an index', () => {
        const [col, row] = getCoordinatesFromIndex(57)

        expect(col).toBe(3)
        expect(row).toBe(6)
    })
})
