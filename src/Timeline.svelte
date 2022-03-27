<script>
    import { rootElement } from './stores/stage.js';
</script>

<!-- TODO: Show the keyframes for all the animations grouped by element (of the context) -->
<!-- TODO: If an element is selected, filter that list with the said element -->
{#if $rootElement}
    <div class="timeline"></div>
{/if}
