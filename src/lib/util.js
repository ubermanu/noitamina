/**
 * Removes classes that start with the given prefix.
 *
 * @param {HTMLElement} element
 * @param {string} prefix
 */
export function removeClassStartsWith(element, prefix) {
  ;[...element.classList].forEach((v) => {
    if (v.startsWith(prefix)) {
      element.classList.remove(v)
    }
  })
}

/**
 * @param {string} str
 * @return {string}
 */
export function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)
}
