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
                        method: nextStep.method,
                    }
                }

                return null
            }

            return {
                helpers: [],
                grid: step.grid,
                method: method.name,
            }
        }
    }

    return null
}
