<script>
    import { CopyIcon, PlusSquareIcon, TrashIcon } from 'svelte-feather-icons';
    import { rootElement } from './stores/stage.js';
    import { animationIndex, animations, selectedAnimation, selectedKeyframe } from './stores/timeline.js';

    /**
     * TODO: Add a random animation name if not specified
     */
    function createAnimation() {
        animationIndex.update(index => index + 1);
        const animation = $rootElement.animate([], { id: 'animation-' + $animationIndex });
        animations.update((items) => [...items, animation]);
        selectedAnimation.set(animation);
        console.log($animations)
    }

    /**
     * @param {Animation} animation
     * @param {number} offset
     */
    function createKeyframe(animation, offset) {
        if (!(animation.effect instanceof KeyframeEffect)) {
            console.error('Animation effect must be a KeyframeEffect');
            return
        }

        const keyframes = animation.effect.getKeyframes();
        const keyframe = { offset };
        selectedKeyframe.set(keyframe);

        animation.effect.setKeyframes([...keyframes, keyframe]);
        animations.update((items) => items.map((item) => item.id === animation.id ? animation : item));
        selectedAnimation.set(animation);
    }
</script>

<!-- TODO: Show the keyframes for all the animations grouped by element (of the context) -->
<!-- TODO: If an element is selected, filter that list with the said element -->
{#if $rootElement}
    <div class="timeline">
        <div class="timeline-headers">
            <div class="timeline-animation-toolbar">
                <button on:click|preventDefault={createAnimation} title="Add animation">
                    <PlusSquareIcon size="1x"/>
                </button>
                <button title="Copy animation">
                    <CopyIcon size="1x"/>
                </button>
                <button title="Delete animation">
                    <TrashIcon size="1x"/>
                </button>
            </div>
            <div class="items">
                {#each $animations as animation}
                    <div class="item animation-name"
                         on:click={() => selectedAnimation.set(animation)}
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
                         on:dblclick|preventDefault={() => createKeyframe(animation, 0)}>
                        {#each animation.effect.getKeyframes() as keyframe}
                            <div class="keyframe" style={`left: ${keyframe.offset}%`}
                                 on:click|preventDefault={() => {
                                     selectedKeyframe.set(keyframe);
                                     selectedAnimation.set(animation);
                                 }}
                                 class:selected={animation === $selectedAnimation && keyframe.offset === $selectedKeyframe.offset}></div>
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

  .animation-keyframes {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .keyframe {
    position: absolute;
    height: 2rem;
    width: 2rem;
    background: #ddd;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #333;

    &.selected {
      background: cornflowerblue;
    }
  }
</style>
