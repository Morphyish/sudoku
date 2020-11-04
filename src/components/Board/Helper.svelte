<script>
    export let values = []

    const cells = Array.from(Array(9).keys()).map(v => v + 1)
</script>

<div class="helper">
    {#each cells as cell}
        <div class="value">{values.includes(cell) ? cell : ''}</div>
    {/each}
</div>

<style>
    .helper {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        font-size: .625rem;
        font-weight: 400;
        color: #a7a7a7;
    }

    .value {
        height: 1rem;
        width: 1rem;
        text-align: center;
        line-height: 1rem;
    }
</style>
