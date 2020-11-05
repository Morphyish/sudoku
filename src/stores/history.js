import { writable } from 'svelte/store'

const initialState = {
    entries: [],
    currentStep: null,
}

function historyStore() {
    const history = writable(initialState)

    const addEntry = entry => {
        history.update(snapshot => ({
            entries: [...snapshot.entries, entry],
            currentStep: null,
        }))
    }

    const toggleEntry = step => {
        history.update(snapshot => {
            if (step === snapshot.currentStep) {
               return {
                   ...snapshot,
                   currentStep: null,
               }
            } else if (step >= 0 && step < snapshot.entries.length) {
                return {
                    ...snapshot,
                    currentStep: step,
                }
            }

            return snapshot
        })
    }

    const reset = () => {
        history.set(initialState)
    }

    return {
        ...history,
        addEntry,
        toggleEntry,
        reset,
    }
}

export const history = historyStore()
