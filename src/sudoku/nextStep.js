import { checkHiddenTuple, checkNakedTuple, checkOwning, easyUpdate, sectorUpdate } from '../algorithms'

export function nextStep(helper, dryRun = false) {
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
            name: 'Hidden Tuple',
            algorithm: checkHiddenTuple,
        },
    ]

    for (const method of methods) {
        const { solved, ...result } = method.algorithm(helper, dryRun)
        if (solved) {
            console.log(method.name)
            return {
                solved,
                method: method.name,
                ...result
            }
        }
    }

    return {
        solved: false,
        value: 0,
        coordinates: [],
    }
}
