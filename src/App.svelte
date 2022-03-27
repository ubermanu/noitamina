<script>
    import Properties from './Properties.svelte';
    import Stage from './Stage.svelte';
    import Timeline from './Timeline.svelte';
    import Toolbar from './Toolbar.svelte';
    import { stageMode } from './stores/stage.js';
</script>

<main class={`noitamina layout-default stage-mode-${$stageMode.toString().toLowerCase()}`}>
    <div class="toolbar-container">
        <Toolbar/>
    </div>
    <div class="stage-container">
        <Stage/>
    </div>
    <div class="timeline-container">
        <Timeline/>
    </div>
    <div class="properties-container">
        <Properties/>
    </div>
</main>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 0.2rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  // TODO: Add different layouts support
  .layout-default {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    grid-template-rows: 1fr max-content;
    gap: 0 0;
    grid-auto-flow: row;
    grid-template-areas: "toolbar stage properties" "toolbar timeline properties";

    .toolbar-container {
      grid-area: toolbar;
    }

    .stage-container {
      grid-area: stage;
    }

    .timeline-container {
      grid-area: timeline;
    }

    .properties-container {
      grid-area: properties;
    }
  }
</style>
