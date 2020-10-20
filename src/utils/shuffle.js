// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffle(arr) {
    const origin = [...arr]
    const result = []

    while (origin.length) {
        const rand = Math.floor(Math.random() * origin.length)
        result.push(...origin.splice(rand, 1))
    }

    return result
}
