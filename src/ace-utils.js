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

/**
 * Sets a property as an attribute on a DOM element.
 * Converts camelCase to dash-case and sets or removes the attribute.
 * @param {string} key - The property name (camelCase).
 * @param {*} value - The value to set as the attribute.
 */
export function propertyToAttribute(key, value) {
    const attrName = camelCaseToAttributeName(key);
    if (value === null || value === undefined) {
        this.removeAttribute(attrName);
    } else {
        this.setAttribute(attrName, value.toString());
    }
}

/**
 * Helper to query elements in shadow DOM only.
 * @param {Element} host - The host element (this).
 * @param {string} selector - The CSS selector.
 * @param {boolean} all - true for all elements, false for the first.
 * @returns {Element|Element[]|null}
 */
export function queryDom(host, selector, all = false) {
    if (!host.shadowRoot) return all ? null : null;
    return all
        ? Array.from(host.shadowRoot.querySelectorAll(selector)) || null
        : host.shadowRoot.querySelector(selector);
}