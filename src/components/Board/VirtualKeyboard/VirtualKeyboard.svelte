<script>
    import Key from './Key.svelte'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    const keys = Array.from(Array(9).keys()).map(v => v+1)

    const forward = key => () => {
        dispatch('input', {
            key,
        });
    }
</script>

<div class="keyboard">
    {#each keys as key}
        <Key {key} on:click={forward(key)} />
    {/each}
    <Key key="0" on:click={forward(0)} />
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
            grid-template-columns: repeat(10, 1.75rem);
            grid-gap: .125rem;
        }
    }
</style>
