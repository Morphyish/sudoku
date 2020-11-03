import { initHelpers } from './initHelpers'

describe('helper/initHelpers', () => {
    it('should return a 9x9x9 array', () => {
        const helper = initHelpers()

        expect(helper).toEqual(expect.any(Array))
        expect(helper.length).toBe(9)

        helper.forEach(row => {
            expect(row).toEqual(expect.any(Array))
            expect(row.length).toBe(9)

            row.forEach(cell => {
                expect(cell).toEqual([1,2,3,4,5,6,7,8,9])
            })
        })
    })
})
