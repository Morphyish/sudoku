import { applyHelperSteps } from './applyHelperSteps'

describe('helper/applyHelperSteps', () => {
    it('should apply the updates to the helper', () => {
        const helpers = [
            [[], [], []],
            [[], [], []],
            [[], [], []],
        ]

        const steps = [
            {
               col: 0,
               row: 0,
               values: [1, 2],
            },
            {
               col: 1,
               row: 0,
               values: [1, 2],
            },
            {
               col: 0,
               row: 2,
               values: [1, 2],
            },
        ]

        const newHelpers = applyHelperSteps(helpers, steps)

        expect(newHelpers).toStrictEqual([
            [[1, 2], [1, 2], []],
            [[], [], []],
            [[1, 2], [], []],
        ])
    })

    it('should return the original array if the steps are empty', () => {
        const helpers = [
            [[], [], []],
            [[], [], []],
            [[], [], []],
        ]

        const newHelpers = applyHelperSteps(helpers, [])

        expect(newHelpers).toBe(helpers)
    })

    it('should return the original array if no step is given', () => {
        const helpers = [
            [[], [], []],
            [[], [], []],
            [[], [], []],
        ]

        const newHelpers = applyHelperSteps(helpers)

        expect(newHelpers).toBe(helpers)
    })
})
