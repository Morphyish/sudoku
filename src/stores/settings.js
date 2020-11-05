import { writable } from 'svelte/store'

const initialState = {
    showErrors: false,
    showHelpers: false,
    showKeyboard: false,
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

    const toggleKeyboard = () => {
        settings.update(state => ({
            ...state,
            showKeyboard: !state.showKeyboard,
        }))
    }

    return {
        ...settings,
        toggleErrors,
        toggleHelpers,
        toggleKeyboard,
    }
}

export const settings = settingsStore()
