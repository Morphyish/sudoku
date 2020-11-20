import { writable } from 'svelte/store'
export let CURRENT_ROUTE = writable('/')

export function navigate(route) {
    CURRENT_ROUTE.set(route)
}
