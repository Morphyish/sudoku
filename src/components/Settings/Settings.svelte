<script>
    import Toggle from './Toggle.svelte'

    import { settings } from '../../stores'
</script>

<div class="settings noprint">
    <Toggle checked={$settings.showErrors} on:click={settings.toggleErrors}>Show errors</Toggle>
    <Toggle checked={$settings.showHelpers} on:click={settings.toggleHelpers}>Show helpers</Toggle>
</div>

<style>
    .settings {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 2rem;
    }
</style>
