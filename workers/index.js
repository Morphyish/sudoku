export function GridFactory() {
    this.worker = new Worker('/workers/grid-factory.js')
    this.onsuccess = () => null

    this.start = () => {
        this.worker.postMessage('new')
    }

    this.worker.onmessage = ({ data }) => {
        this.onsuccess(data)
    }
}
