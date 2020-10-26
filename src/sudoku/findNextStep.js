import { checkHiddenPair, checkNakedTuple, checkOwning, easyUpdate, sectorUpdate } from '../algorithms'

export function findNextStep(helper) {
    const methods = [
        {
            name: 'Easy Update',
            algorithm: easyUpdate,
        },
        {
            name: 'Sector Update',
            algorithm: sectorUpdate,
        },
        {
            name: 'Square Owning',
            algorithm: checkOwning,
        },
        {
            name: 'Naked Tuple',
            algorithm: checkNakedTuple,
        },
        {
            name: 'Hidden Pair',
            algorithm: checkHiddenPair,
        },
    ]

    for (const method of methods) {
        const nextStep = method.algorithm(helper)
        if (nextStep) {
            console.log(method.name)
            console.log(nextStep)
            return {
                method: method.name,
                nextStep,
            }
        }
    }

    console.log('No solution found!')

    return {
        nextStep: null,
    }
}
