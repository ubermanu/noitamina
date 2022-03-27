<script>
    import { CopyIcon, PlusSquareIcon, TrashIcon } from 'svelte-feather-icons';
    import { rootElement } from './stores/stage.js';
    import {
        animations,
        createAnimation,
        createKeyframe,
        selectedAnimation,
        selectedKeyframe,
        selectItem
    } from './stores/timeline.js';
</script>

<!-- TODO: Show the keyframes for all the animations grouped by element (of the context) -->
<!-- TODO: If an element is selected, filter that list with the said element -->
{#if $rootElement}
    <div class="timeline" on:click={() => selectItem(null, null)}>
        <div class="timeline-headers">
            <div class="timeline-animation-toolbar">
                <button on:click={createAnimation} title="Add animation">
                    <PlusSquareIcon size="1x"/>
                </button>
                <button title="Copy animation" disabled>
                    <CopyIcon size="1x"/>
                </button>
                <button title="Delete animation" disabled>
                    <TrashIcon size="1x"/>
                </button>
            </div>
            <div class="items">
                {#each $animations as animation}
                    <div class="item animation-name"
                         on:click|stopPropagation={() => selectItem(animation)}
                         class:selected={animation === $selectedAnimation}>
                        <span>{animation.id}</span>
                    </div>
                {/each}
            </div>
        </div>
        <div class="timeline-animations">
            <div class="timeline-keyframes-toolbar"></div>
            <div class="timeline-marker"></div>
            <div class="items">
                {#each $animations as animation}
                    <!-- TODO: Convert the correct keyframe position according to the animation total playtime -->
                    <div class="item animation-keyframes"
                         on:dblclick|stopPropagation={() => createKeyframe(animation, 0)}
                         on:click|stopPropagation={() => selectItem(animation)}
                         class:selected={animation === $selectedAnimation}>
                        {#each animation.effect.getKeyframes() as keyframe}
                            <div class="keyframe" style={`left: ${parseFloat(keyframe.offset) * 100}%`}
                                 on:click|stopPropagation={() => selectItem(animation, keyframe)}
                                 class:selected={animation === $selectedAnimation && $selectedKeyframe && keyframe.offset === $selectedKeyframe.offset}></div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
  .timeline {
    min-height: 20rem;
    display: flex;
    flex-direction: row;
    user-select: none;
  }

  .timeline-headers {
    flex-basis: 20rem;
  }

  .timeline-animations {
    flex-grow: 1;
    border-left: 1px solid #222;
  }

  .timeline-animation-toolbar,
  .timeline-keyframes-toolbar {
    background: #ddd;
    height: 2rem;
  }

  .items > .item {
    background: #eee;
    height: 2rem;

    &:nth-child(even) {
      background: #f4f4f4;
    }
  }

  .animation-name,
  .animation-keyframes {
    &.selected {
      background: lightskyblue !important;
    }
  }

  .animation-keyframes {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .keyframe {
    position: absolute;
    height: 2rem;
    width: 2rem;
    background: #444;
    box-sizing: border-box;
    cursor: pointer;

    &.selected {
      background: cornflowerblue;
    }
  }
</style>
