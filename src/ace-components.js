import { reactive } from './ace-reactivity.js';
import { propertyToAttribute, queryDom } from './ace-utils.js';

/**
 * Decorator to query an element by CSS selector in shadow DOM.
 * @param {string} selector - The CSS selector.
 * @returns {PropertyDecorator} - A decorator for fields.
 */
export function query(selector) {
    return function (target, context) {
        if (context.kind !== 'field') {
            throw new Error(`@query can only be used on fields, not on "${context.kind}"`);
        }
        context.addInitializer(function () {
            Object.defineProperty(this, context.name, {
                get: function () {
                    return queryDom(this, selector, false);
                },
                configurable: true,
                enumerable: true,
            });
        });
    };
}

/**
 * Decorator to query all elements by CSS selector in shadow DOM.
 * @param {string} selector - The CSS selector.
 * @returns {PropertyDecorator} - A decorator for fields.
 */
export function queryAll(selector) {
    return function (target, context) {
        if (context.kind !== 'field') {
            throw new Error(`@queryAll can only be used on fields, not on "${context.kind}"`);
        }
        context.addInitializer(function () {
            Object.defineProperty(this, context.name, {
                get: function () {
                    return queryDom(this, selector, true);
                },
                configurable: true,
                enumerable: true,
            });
        });
    };
}

/**
 * Registers a class as a custom element.
 * @param {string} name - The name of the custom element.
 * @returns {ClassDecorator} - A decorator function for classes.
 */
export function customElement(name) {
    return function (target, context) {
        if (context.kind !== 'class') {
            throw new Error(`@customElement can only be used on classes, not on "${context.kind}"`);
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
export function bound(target, context) {
    if (context.kind !== 'method') {
        throw new Error(`@bound can only be used on methods, not on "${context.kind}"`);
    }

    context.addInitializer(function () {
        this[context.name] = this[context.name].bind(this);
    });
}

/**
 * Makes a property reactive and reflects it to an attribute.
 * @param {Object} options - Options for the reflected property.
 * @param {Function} [options.converter] - A function to convert the attribute value to a property value.
 * @returns {PropertyDecorator} - A decorator function for properties.
 */
export function attribute(target, context) {
    if (context.kind !== 'field') {
        throw new Error(`@attribute can only be used on fields, not on "${context.kind}"`);
    }

    context.addInitializer(function () {
        const key = context.name;
        const refValue = reactive({ value: this[key] });
        propertyToAttribute.call(this, key, refValue.value);

        Object.defineProperty(this, key, {
            get() {
                return refValue.value;
            },
            set(value) {
                const prevValue = refValue.value;
                if (value === prevValue) return;

                refValue.value = value;
                propertyToAttribute.call(this, key, value);
            },
        });
    });
}
