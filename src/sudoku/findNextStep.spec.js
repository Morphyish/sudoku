import { findNextStep } from './findNextStep'

describe('sudoku/findNextStep', () => {
    it('should return the next step if it exists', () => {
        const nextStep = findNextStep('solvable')

        expect(nextStep).not.toBeNull()
        expect(nextStep.method).toBe('sometimes succeed')
        expect(nextStep.updates).toEqual(expect.any(Array))
    })

    it('should return null if no next step can be found', () => {
        const nextStep = findNextStep('unsolvable')

        expect(nextStep).toBeNull()
    })
})

jest.mock('../algorithms', () => ({
    methods: [
        {
            name: 'always fail',
            algorithm: () => null,
        },
        {
            name: 'sometimes succeed',
            algorithm: helpers => helpers === 'solvable' ? { updates: [] } : null,
        },
    ],
}))
