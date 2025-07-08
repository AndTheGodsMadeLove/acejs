/**
 * Checks if a value is an object.
 * @param {*} val - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 */
export function isObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}