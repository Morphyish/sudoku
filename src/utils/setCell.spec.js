import { setCell } from './setCell'

describe('utils/setCell', () => {
    it('should set the value in a 2 dimensional array', () => {
        const dummyArray = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
        setCell(dummyArray, 5, 0, 0)

        expect(dummyArray).toStrictEqual([[0, 1, 2, 3, 4, 0, 6, 7, 8, 9]])
    })
})
