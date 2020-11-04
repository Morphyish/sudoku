import { findNextStep } from './findNextStep'

// TODO: Fix tests and make comprehensive tests instead

describe.skip('sudoku/findNextStep', () => {
    it('should return the next step if it exists', () => {
        const nextStep = findNextStep('solvable')

        expect(nextStep).not.toBeNull()
        expect(nextStep.method).toBe('sometimes succeed')
        expect(nextStep.helpers).toEqual(expect.any(Array))
        expect(nextStep.grid).toEqual(expect.any(Array))
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
            algorithm: helpers => helpers === 'solvable' ? { grid: [], helpers: [] } : null,
        },
    ],
}))
