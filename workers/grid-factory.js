import { create, obfuscate, empty } from '../src/factory'

self.addEventListener(
    'message',
    () => {
        postMessage({
            updates: [{
                message: 'Grid generation - ongoing',
            }],
        })

        const newGrid = create()

        postMessage({
            updates: [
                {
                    message: 'Grid generation - done',
                },
                {
                    message: 'Grid shuffling - ongoing',
                },
            ],
        })

        const obfuscatedGrid = obfuscate(newGrid)


        postMessage({
            updates: [
                {
                    message: 'Grid shuffling - done',
                },
                {
                    message: 'Cell removal - ongoing',
                },
            ],
        })

        let i = 0
        let grid
        let methods = []
        let difficulty = 0
        let nbOfCells = 0

        do {
            const result = empty(obfuscatedGrid)
            grid = result.grid
            methods = [...new Set(result.methods)]
            difficulty = methods.length
            nbOfCells = result.nbOfCells
            i++

            postMessage({
                updates: [
                    {
                        message: `Attempt ${i} - ${difficulty < 4 ? 'failure' : 'success'}`,
                    },
                ],
            })
        } while (difficulty < 4 && i < 100)

        postMessage({
            updates: [{
                message: 'Cell removal - done',
            }],
            success: {
                grid,
                methods,
                difficulty,
                nbOfCells,
            },
        })
    },
)
