import { easyUpdate } from '../algorithms'

export function nextStep(helper) {
    const methods = [
        {
            name: 'Easy Update',
            algorithm: easyUpdate,
        }
    ]

    for (const method of methods) {
        const { solved, ...result } = method.algorithm(helper)
        if (solved) {
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
