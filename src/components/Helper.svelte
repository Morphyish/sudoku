<script>
    import { helper } from '../stores'

    export let x = 0
    export let y = 0

    let values = []
    $: $helper, values = helper.getCell(x, y)
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
