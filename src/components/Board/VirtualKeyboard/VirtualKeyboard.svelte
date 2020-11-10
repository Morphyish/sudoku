<script>
    import Key from './Key.svelte'

    const keys = Array.from(Array(9).keys()).map(v => v+1)
</script>

<div class="keyboard">
    {#each keys as key}
        <Key {key} on:input />
    {/each}
    <Key key="0" on:input />
</div>

<style>
    .keyboard {
        display: grid;
        grid-template-columns: repeat(10, 2.5rem);
        grid-gap: .5rem;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
    }

    @media screen and (max-width: 30rem) {
        .keyboard {
            grid-template-rows: repeat(2, 2.5rem);
            grid-template-columns: repeat(5, 2.5rem);
            grid-gap: .5rem;
        }
    }
</style>
