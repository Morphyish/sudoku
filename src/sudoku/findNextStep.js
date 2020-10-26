import { checkHiddenPair, checkNakedTuple, checkOwning, easyUpdate, sectorUpdate } from '../algorithms'

// TODO: Update method and algorithms to use a snapshot of helpers, with the getCell utils method

export function findNextStep(helpers) {
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
        const nextStep = method.algorithm(helpers)
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
