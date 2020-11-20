<script>
    export let checked = false
</script>

<button class:checked on:click  {...$$props}>
    <slot />
</button>

<style>
    button {
        background: none;
        border: 1px solid transparent;
    }

    button:focus,
    button:hover {
        border-color: #666;
    }

    .checked {
        color: #ff3e00;
    }

    button:disabled {
        color: #999;
    }
</style>
