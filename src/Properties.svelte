<script>
    import { selectedElement } from './stores/stage.js';
    import { selectedAnimation, selectedKeyframe } from "./stores/timeline.js";
    import { extractKeyframeStyles } from "./lib/animation.js";
    import animatableProps from './lib/animatable.js'

    const baseOptions = {};
    animatableProps.forEach(prop => {
        baseOptions[prop] = '';
    });

    function getKeyframeOptions(keyframe) {
        const preset = extractKeyframeStyles(keyframe);
        return { ...baseOptions, ...preset };
    }

    function updateKeyframeProperty(name, value) {
        const baseOffset = $selectedKeyframe.offset;
        selectedKeyframe.update(props => ({ ...props, [name]: value }));
        selectedAnimation.update(animation => {
            const keyframes = animation.effect.getKeyframes()
                .map(keyframe => keyframe.offset === baseOffset ? $selectedKeyframe : keyframe);
            animation.effect.setKeyframes(keyframes);
            return animation;
        });
        // console.log(name, value, $selectedKeyframe)
        // console.log($selectedAnimation, $selectedAnimation.effect.getKeyframes());
    }
</script>

<!-- TODO: Add tab nav -->
<div class="properties">
    <div class="tab tool" style="display: none">
        <h4>Tool</h4>
        <!-- TODO: Settings of the current stage mode -->
    </div>
    <div class="tab tool">
        <!-- TODO: Settings of the selected element -->
        {#if $selectedKeyframe}
            <h4>Keyframe</h4>
            <table>
                <tr>
                    <td>
                        <label>Offset</label>
                    </td>
                    <td>
                        <input type="number" value={$selectedKeyframe.offset}
                               min="0" max="1" step="0.01"
                               on:input={e => updateKeyframeProperty('offset', +e.target.value)}
                        />
                    </td>
                </tr>
            </table>
            <table>
                {#each Object.entries(getKeyframeOptions($selectedKeyframe)) as [key, value]}
                    <tr class="property">
                        <td>
                            <label>{key}</label>
                        </td>
                        <td>
                            <input type="text" value={value}
                                   on:input={(e) => updateKeyframeProperty(key, e.target.value)}/>
                        </td>
                    </tr>
                {/each}
            </table>
        {/if}
        {#if $selectedAnimation}
            <h4>Animation</h4>
        {/if}
        {#if $selectedElement}
            <h4>Element</h4>
        {/if}
    </div>
    <div class="tab tool">
        <h4>Doc</h4>
        <!-- TODO: Settings of the current context -->
    </div>
</div>
