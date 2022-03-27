import { writable } from 'svelte/store'

/**
 * Edition mode of the stage (main screen)
 *
 * @type {Writable<string>}
 */
export const stageMode = writable('SELECTION')

/**
 * TODO: Maybe remove that, kind of unnecessary
 * @param {string} mode
 */
export const setStageMode = (mode) => {
  stageMode.set(mode)
}

/**
 * The element that is currently used as context.
 * All the animations of the children elements will be editable.
 *
 * @type {Writable<null|HTMLElement>}
 */
export const rootElement = writable(null)

/**
 * The currently selected element in the stage
 * FIXME: This could be a pseudo element like before or after
 *
 * @type {Writable<null|HTMLElement>}
 */
export const selectedElement = writable(null)
