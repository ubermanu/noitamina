<script>
    export let icon = null;
    export let action = () => false;
    export let active = false;
    export let tooltip = '';
</script>

<button class="button" on:click|preventDefault={action} class:active={active} title={tooltip}>
    {#if icon}
        <svelte:component this={icon} size="1x"/>
    {:else }
        <span>{tooltip}</span>
    {/if}
</button>

<style lang="scss">
  .button {
    &.active {
      border-color: cornflowerblue;
    }
  }
</style>
