<script>
    import { rootElement } from "./stores/stage.js";
</script>

{#if $rootElement}
    <div class="stage">
        <div bind:this={$rootElement}></div>
    </div>
{/if}
