/**
 * TODO: For each animation, ensure it's of type keyframes.
 *
 * @param {HTMLElement} element
 * @return {Animation[]}
 */
export const getAnimations = (element) => {
  return element.getAnimations({ subtree: true })
}

/**
 * Filter the props of a keyframe to return the CSS ones.
 *
 * @param {{}} keyframe
 * @return {{}}
 */
export function extractKeyframeStyles(keyframe) {
  const { offset, computedOffset, easing, composite, ...styles } = keyframe
  return styles
}

/**
 * Convert an animation to plain CSS.
 * Note: Supports only keyframes at the moment
 *
 * @param {Animation} animation
 * @return {string}
 */
export function convertAnimationToCss(animation) {
  let css = `@keyframes ${animation.animationName} {\n`

  if (animation.effect instanceof KeyframeEffect) {
    const keyframes = animation.effect.getKeyframes()

    for (let keyframe of keyframes) {
      css += `\t${keyframe.offset * 100}% {\n`

      const styles = extractKeyframeStyles(keyframe)
      for (let prop in styles) {
        css += `\t\t${prop}: ${styles[prop]};\n`
      }

      css += `\t}\n`
    }
  }

  return css + `}`
}
