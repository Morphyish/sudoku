<script>
    export let entry = {}
    export let current = false
    export let element
</script>


<div class="entry" class:current on:click bind:this={element}>
    {entry.method}
</div>

<style>
    .entry {
        cursor: pointer;
        padding: 1rem .5rem;
        margin-bottom: .5rem;
    }

    .entry.current {
        box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08), 0 1px 3px 1px rgba(66, 66, 66, 0.16);
    }
</style>
