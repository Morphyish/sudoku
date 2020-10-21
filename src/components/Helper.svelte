<script>
    import { helper } from '../stores'

    export let col = 0
    export let row = 0

    let values = []
    $: $helper, values = helper.getCell(col, row)
</script>

<div class="helper">
    {#each values as value}
        <div class="value">{value}</div>
    {/each}
</div>

<style>
    .helper {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        font-size: .625rem;
        color: #a7a7a7;
    }

    .value {
        height: 1rem;
        width: 1rem;
        text-align: center;
        line-height: 1rem;
    }
</style>
