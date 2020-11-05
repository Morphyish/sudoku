<script>
    export let key = 0
</script>

<button on:click>
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

    @media screen and (max-width: 30rem) {
        button {
            height: 1.75rem;
            width: 1.75rem;
            font-size: 1rem;
        }
    }
</style>
