import { generateNewGrid } from '../src/grid'

self.addEventListener(
    'message',
    () => {
        const newGrid = generateNewGrid()
        postMessage(newGrid)
    },
)
