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
                {#each Object.entries(getKeyframeOptions($selectedKeyframe)) as [key, value]}
                    <tr class="property">
                        <td>
                            <label>{key}</label>
                        </td>
                        <td>
                            <input type="text" value={value} name="" on:input={(e) => {
                                selectedKeyframe.update(props => ({
                                    ...props,
                                    [key]: e.target.value
                                }));
                                console.log(key, e.target.value, $selectedKeyframe)
                            }}/>
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
