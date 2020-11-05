<script>
    export let entry = {}
    export let open = false
    export let element = null
</script>


<details {open} on:click|preventDefault bind:this={element}>
    <summary>
        <span class="title">
            {entry.method}<br>
            <span class="step">
                <span>Col: <strong>{entry.grid.col + 1}</strong></span>
                <span>Row: <strong>{entry.grid.row + 1}</strong></span>
                <span>Value: <strong>{entry.grid.value}</strong></span>
            </span>
        </span>
    </summary>
</details>

<style>
    details {
        cursor: pointer;
        margin-bottom: .5rem;
    }

    details[open] {
        border: 1px solid #ff3e00;
    }

    summary {
        display: flex;
        align-items: center;
        outline: none;
        padding: 1rem .5rem;
    }

    .title {
        display: inline-block;
        flex: 1;
    }

    .step {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }
</style>
