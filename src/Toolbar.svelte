<script>
    import { MousePointerIcon, PlusSquareIcon, SquareIcon } from 'svelte-feather-icons';
    import { stageMode } from './stores/stage.js';
    import ActionButton from "./Toolbar/ActionButton.svelte";
    import Separator from "./Toolbar/Separator.svelte";
</script>

<div class="toolbar">
    <ActionButton
        icon={MousePointerIcon}
        action={() => stageMode.set('SELECTION')}
        active={$stageMode === 'SELECTION'}
        tooltip="Set mode to selection"
    />
    <ActionButton
        icon={SquareIcon}
        action={() => stageMode.set('TRANSFORM')}
        active={$stageMode === 'TRANSFORM'}
        tooltip="Set mode to transform"
    />
    <Separator/>
    <!-- TODO: Add a popup to insert a new element with attrs in the stage context -->
    <ActionButton
        icon={PlusSquareIcon}
        action={() => console.log('Add new element')}
        tooltip="Insert a new element"
    />
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    flex-direction: column;
  }
</style>
