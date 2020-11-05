<script>
    import Toggle from './Toggle.svelte'

    import { settings } from '../../stores'
</script>

<div class="settings noprint">
    <Toggle checked={$settings.showKeyboard} on:click={settings.toggleKeyboard}>Keyboard</Toggle>
    <Toggle checked={$settings.showErrors} on:click={settings.toggleErrors}>Errors</Toggle>
    <Toggle checked={$settings.showHelpers} on:click={settings.toggleHelpers}>Helpers</Toggle>
</div>

<style>
    .settings {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 1px;
    }
</style>
