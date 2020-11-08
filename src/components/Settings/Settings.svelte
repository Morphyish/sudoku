<script>
    import Toggle from './Toggle.svelte'

    import { sudoku, settings } from '../../stores'
</script>

<div class="settings noprint">
    <Toggle checked={$settings.showKeyboard} disabled={$sudoku.loading} on:click={settings.toggleKeyboard}>Keyboard</Toggle>
    <Toggle checked={$settings.showErrors} disabled={$sudoku.loading} on:click={settings.toggleErrors}>Errors</Toggle>
    <Toggle checked={$settings.showHelpers} disabled={$sudoku.loading} on:click={settings.toggleHelpers}>Helpers</Toggle>
</div>

<style>
    .settings {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 1px;
    }
</style>
