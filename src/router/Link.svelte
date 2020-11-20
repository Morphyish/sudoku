<script>
    import { CURRENT_ROUTE } from './routing'

    export let to = undefined
    export let active = false

    const handleNavigation = () => CURRENT_ROUTE.set(to)

    $: active = $CURRENT_ROUTE === to
</script>

<a {...$$props} on:click={handleNavigation}>
    <slot />
</a>

<style>
    a {
        cursor: pointer;
    }
</style>
