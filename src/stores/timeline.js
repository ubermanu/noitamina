import { get, writable } from 'svelte/store'
import { rootElement } from './stage.js'

/**
 * @type {Writable<Animation[]>}
 */
export const animations = writable([])

/**
 * @type {Writable<Animation|null>}
 */
export const selectedAnimation = writable(null)

/**
 * @type {Writable<number>}
 */
export const animationIndex = writable(0)

/**
 * @type {Writable<Keyframe|null>}
 */
export const selectedKeyframe = writable(null)

/**
 * TODO: Add a random animation name if not specified
 */
export function createAnimation() {
  animationIndex.update((index) => index + 1)
  const animation = get(rootElement).animate([], {
    id: 'animation-' + get(animationIndex)
  })
  animations.update((items) => [...items, animation])
  selectedAnimation.set(animation)
  console.log(get(animations))
}

/**
 * @param {Animation} animation
 * @param {number} offset
 */
export function createKeyframe(animation, offset) {
  if (!(animation.effect instanceof KeyframeEffect)) {
    console.error('Animation effect must be a KeyframeEffect')
    return
  }

  const keyframes = animation.effect.getKeyframes()
  const keyframe = { offset }
  selectedKeyframe.set(keyframe)

  animation.effect.setKeyframes([...keyframes, keyframe])
  animations.update((items) =>
    items.map((item) => (item.id === animation.id ? animation : item))
  )
  selectedAnimation.set(animation)
}

/**
 * @param {Animation}animation
 * @param {number} offset
 * @param {object} keyframe
 */
export function updateKeyframe(animation, offset, keyframe) {
  if (!(animation.effect instanceof KeyframeEffect)) {
    console.error('Animation effect must be a KeyframeEffect')
    return
  }

  const keyframes = animation.effect
    .getKeyframes()
    .map((kf) => (kf.offset === offset ? { ...kf, ...keyframe } : kf))

  animations.update((items) =>
    items.map((item) => (item.id === animation.id ? animation : item))
  )
  selectedAnimation.set(animation)
}

/**
 * @param {Animation} animation
 * @param {object} keyframe
 */
export function selectItem(animation, keyframe = null) {
  selectedAnimation.set(animation)
  selectedKeyframe.set(keyframe)
}
