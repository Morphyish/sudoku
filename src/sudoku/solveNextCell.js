import { clone } from '../utils'
import { getHelpers } from '../helper'
import { findNextStep } from './findNextStep'

export function solveNextCell(grid) {
    let clonedGrid = clone(grid)
    let helpers = getHelpers(clonedGrid)

    const step = findNextStep(helpers)
    if (step) {
        return {
            isSolvable: true,
            step,
            methods: step.methods,
        }
    }

    return {
        isSolvable: false,
    }
}
