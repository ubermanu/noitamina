<script>
    import { selectedElement } from './stores/stage.js';
</script>

<!-- TODO: Add tab nav -->
<div class="properties">
    <div class="tab tool">
        <h4>Tool</h4>
        <!-- TODO: Settings of the current stage mode -->
    </div>
    <div class="tab tool">
        <h4>Object</h4>
        <!-- TODO: Settings of the selected element -->
        {#if $selectedElement}
        {/if}
    </div>
    <div class="tab tool">
        <h4>Doc</h4>
        <!-- TODO: Settings of the current context -->
    </div>
</div>
