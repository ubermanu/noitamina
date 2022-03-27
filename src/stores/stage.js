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
