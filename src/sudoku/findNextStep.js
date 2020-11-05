import { methods } from '../algorithms'
import { applyStep } from './applyStep'

export function findNextStep(helpers) {
    for (const method of methods) {
        const step = method.algorithm(helpers)
        if (step) {
            if (step.helpers) {
                const { helpers: updatedHelpers } = applyStep([], helpers, step)
                const nextStep = findNextStep(updatedHelpers)
                if (nextStep) {
                    return {
                        helpers: [
                            ...step.helpers,
                            ...nextStep.helpers,
                        ],
                        grid: nextStep.grid,
                        methods: [
                            method.name,
                            ...nextStep.methods,
                        ],
                    }
                }

                return null
            }

            return {
                helpers: [],
                grid: step.grid,
                methods: [method.name],
            }
        }
    }

    return null
}
