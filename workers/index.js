export function GridFactory() {
    this.worker = new Worker('/workers/grid-factory.js')
    this.onprogress = null
    this.onsuccess = null

    this.start = () => {
        this.worker.postMessage('new')
    }

    this.worker.onmessage = ({ data }) => {
        const { updates, success } = data
        if (updates && this.onprogress) {
            updates.forEach(update => {
                this.onprogress(update)
            })
        }

        if (success && this.onsuccess) {
            this.onsuccess(success)
            this.worker.terminate()
        }
    }
}
