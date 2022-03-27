<script>
    import { MousePointerIcon, PlusSquareIcon, SquareIcon } from 'svelte-feather-icons';
    import { setStageMode, stageMode } from './stores/stage.js';
</script>

<div class="toolbar">
    <button class="button"
            on:click|preventDefault={() => setStageMode('SELECTION')}
            class:active={$stageMode === 'SELECTION'}
            title="Set mode to selection">
        <MousePointerIcon size="1x"/>
    </button>
    <button class="button"
            on:click|preventDefault={() => setStageMode('TRANSFORM')}
            class:active={$stageMode === 'TRANSFORM'}
            title="Set mode to transform">
        <SquareIcon size="1x"/>
    </button>
    <div class="separator"></div>
    <!-- TODO: Add a popup to insert a new element with attrs in the stage context -->
    <button title="Insert a new element" disabled>
        <PlusSquareIcon size="1x"/>
    </button>
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    flex-direction: column;
  }

  .button {
    &.active {
      border-color: cornflowerblue;
    }
  }
</style>
