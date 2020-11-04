<script>
    export let checked = false
</script>

<button class:checked on:click>
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
</style>
