import { writable } from 'svelte/store'

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
