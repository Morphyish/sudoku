import { writable } from 'svelte/store'
import { initHelpers } from '../helper'
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

    return {
        ...helper,
        setCell,
        init,
    }
}

export const helper = helperStore()
