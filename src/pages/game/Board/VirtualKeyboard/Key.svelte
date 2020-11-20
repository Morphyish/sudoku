<script>
    import { createEventDispatcher } from 'svelte';

    export let key = 0

    let element = null
    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('input', {
            key,
        });
    }
</script>

<button on:click={handleClick} on:mousedown={element.focus} data-focus="virtual-keyboard" bind:this={element}>
    {key}
</button>

<style>
    button {
        height: 2.5rem;
        width: 2.5rem;
        font-size: 1.5rem;
        line-height: 1;
        color: #333;
        text-align: center;
        background: transparent;
        border: 1px solid #d7d7d7;
        border-radius: 50%;
        margin: 0;
        padding: 0;
    }

    button:hover,
    button:focus {
        border-color: #333;
    }
</style>
