<script>
    import { CURRENT_ROUTE } from './routing'

    export let path = undefined
    export let component
</script>

{#if $CURRENT_ROUTE === path}
    <svelte:component this={component} />
{/if}
