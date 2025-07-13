/**
 * Checks if a value is an object.
 * @param {*} val - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 */
export function isObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}

/**
 * Converts a lower camelCase string to a valid attribute name.
 * @param {string} str - The camelCase string to convert.
 * @returns {string} - The converted attribute name.
 */
export function camelCaseToAttributeName(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
