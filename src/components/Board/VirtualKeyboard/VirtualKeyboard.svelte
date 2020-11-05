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
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
    }
</style>
