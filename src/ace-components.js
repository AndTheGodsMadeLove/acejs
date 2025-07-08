/**
 * Registers a class as a custom element.
 * @param {string} name - The name of the custom element.
 * @returns {ClassDecorator} - A decorator function for classes.
 */
export function CustomElement(name) {
    return function (target, context) {
        if (context.kind !== 'class') {
            throw new Error(`@CustomElement can only be used on classes, not on "${context.kind}"`);
        }

        context.addInitializer(() => customElements.define(name, target));
    };
}

/**
 * Binds a method to the instance of the class.
 * @param {Function} target - The target method.
 * @param {Object} context - The context of the method.
 * @returns {MethodDecorator} - A decorator function for methods.
 */
export function Bound(target, context) {
    if (context.kind !== 'method') {
        throw new Error(`@Bound can only be used on methods, not on "${context.kind}"`);
    }

    context.addInitializer(function () {
        this[context.name] = this[context.name].bind(this);
    });
}