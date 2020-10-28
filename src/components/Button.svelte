<button on:click>
    <slot />
</button>

<style>
    button {
        border: 1px solid #ccc;
        background-color: #f4f4f4;
        outline: none;
    }

    button:not(:disabled):active {
        background-color: #ddd;
    }
</style>
