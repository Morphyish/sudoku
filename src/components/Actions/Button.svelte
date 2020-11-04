<button on:click>
    <slot />
</button>

<style>
    button {
        border: 1px solid #ccc;
        background-color: #f4f4f4;
        outline: none;
    }

    button:focus,
    button:hover {
        border-color: #666;
    }

    button:not(:disabled):active {
        background-color: #ddd;
    }

    button:disabled {
        color: #999;
    }
</style>
