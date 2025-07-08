import { isObject } from './ace-utils.js';

const dependenciesMap = new WeakMap();
const effectQueue = new Set();
let activeEffect = null;
let isBatching = false;

/**
 * Tracks dependencies for reactive objects.
 * @param {Object} target - The reactive object.
 * @param {string|symbol} key - The property key being accessed.
 */
function track(target, key) {
    if (!activeEffect) return;

    let dependencies = dependenciesMap.get(target);
    if (!dependencies) {
        dependencies = new Map();
        dependenciesMap.set(target, dependencies);
    }

    let dependency = dependencies.get(key);
    if (!dependency) {
        dependency = new Set();
        dependencies.set(key, dependency);
    }

    dependency.add(activeEffect);
}

/**
 * Triggers effects for a reactive object's property.
 * @param {Object} target - The reactive object.
 * @param {string|symbol} key - The property key being modified.
 */
function trigger(target, key) {
    const dependencies = dependenciesMap.get(target);
    if (!dependencies) return;

    const dependency = dependencies.get(key);
    if (dependency) {
        dependency.forEach(effectFn => effectQueue.add(effectFn));
    }

    if (!isBatching) {
        isBatching = true;
        queueMicrotask(() => {
            effectQueue.forEach(effectFn => effectFn());
            effectQueue.clear();
            isBatching = false;
        });
    }
}

/**
 * Creates a reactive proxy for an object.
 * @template T
 * @param {T} target - The target object to make reactive.
 * @param {{ deep?: boolean }} [options] - Options for reactivity.
 * @returns {T} - The reactive proxy.
 */
function reactive(target, options) {
    if (!isObject(target)) return target;

    return new Proxy(target, {
        get(obj, key, receiver) {
            const result = Reflect.get(obj, key, receiver);

            if (options?.deep && isObject(result)) {
                return reactive(result, options);
            }

            track(obj, key);
            return result;
        },

        set(obj, key, value, receiver) {
            const prevValue = Reflect.get(obj, key, receiver);
            if (prevValue === value) {
                return true;
            }

            const result = Reflect.set(obj, key, value, receiver);

            trigger(obj, key);
            return result;
        },
    });
}

/**
 * Executes a reactive effect function.
 * @param {Function} fn - The effect function to execute.
 */
function useEffect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

/**
 * Creates a computed property that automatically updates when its dependencies change.
 * @param {Function} getter - The function to compute the value.
 * @returns {Proxy} - A reactive proxy for the computed value.
 */
function computed(getter) {
    let cachedValue;
    let isDirty = true;

    const effectFn = () => {
        isDirty = true;
        trigger(computedProxy, 'value');
    };

    const computedProxy = reactive({
        get value() {
            if (isDirty) {
                activeEffect = effectFn;
                cachedValue = getter();
                activeEffect = null;
                isDirty = false;
            }
            track(computedProxy, 'value');
            return cachedValue;
        },
    });

    return computedProxy;
}



/**
 * Decorator to create a reactive effect for a method.
 * @param {Function} target - The target method.
 * @param {Object} context - The context of the method.
 */
export function Effect(target, context) {
    if (context.kind !== 'method') {
        throw new Error(`@Effect can only be used on methods, not on "${context.kind}"`);
    }

    context.addInitializer(function () {
        const boundEffect = target.bind(this);
        queueMicrotask(() => useEffect(boundEffect));
    });
}

/**
 * Decorator to make a class field reactive.
 * @param {Object} target - The target class.
 * @param {Object} context - The context of the field.
 * @returns {Function} - A function to initialize the reactive field.
 */
export function Reactive(target, context) {
    if (context.kind !== 'field') {
        throw new Error(`@Reactive can only be used on fields, not on "${context.kind}"`);
    }

    return (value, options = {}) => reactive(value, options);
}

/**
 * Decorator to create a computed property.
 * @param {Object} target - The target class.
 * @param {Object} context - The context of the field.
 */
export function Computed(target, context) {
    if (context.kind !== 'field') {
        throw new Error(`@Computed can only be used on fields, not on "${context.kind}"`);
    }

    context.addInitializer(function () {
        const getter = this[context.name];
        const computedValue = computed(getter.bind(this));

        Object.defineProperty(this, context.name, {
            get: () => computedValue.value,
        });
    });
}
