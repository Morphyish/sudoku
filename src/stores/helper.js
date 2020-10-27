import { writable } from 'svelte/store'
import { updateHelpers, initHelpers } from '../helper'
import { clone } from '../utils'

function helperStore() {
    const helper = writable([])

    const init = () => helper.set(initHelpers())

    const setCell = (col, row, values) => {
        helper.update(snapshot => {
            const updatedHelper = clone(snapshot)

            updatedHelper[row][col] = values

            return updatedHelper
        })
    }

    const updateFrom = grid => helper.update(snapshot => updateHelpers(snapshot, grid))

    return {
        ...helper,
        setCell,
        init,
        updateFrom,
    }
}

export const helper = helperStore()
