import { writable } from 'svelte/store'

const initialState = {
    showErrors: false,
    showHelpers: false,
}

function settingsStore() {
    const settings = writable(initialState)

    const toggleErrors = () => {
        settings.update(state => ({
            ...state,
            showErrors: !state.showErrors,
        }))
    }

    const toggleHelpers = () => {
        settings.update(state => ({
            ...state,
            showHelpers: !state.showHelpers,
        }))
    }

    return {
        ...settings,
        toggleErrors,
        toggleHelpers,
    }
}

export const settings = settingsStore()
