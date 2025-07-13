/** Checks if a value is an object. */
declare function isObject(val: any): boolean;

/** Converts a camelCase string to an attribute name. */
declare function camelCaseToAttributeName(str: string): string;

/**
 * Registers a class as a service in the dependency injection container.
 * @param name The name of the service.
 */
declare function Service(name: string): ClassDecorator;

/**
 * Injects a service into a field or method.
 * @param name The name of the service to inject.
 */
declare function Inject(name: string): PropertyDecorator | MethodDecorator;

/**
 * Makes an object or array reactive.
 * @param target The target object or array.
 * @param options Options for reactivity, such as deep observation.
 */
declare function reactive<T>(target: T, options?: { deep?: boolean }): T;

/**
 * Creates a reactive reference to a value.
 * @param value The value to be made reactive.
 */
declare function ref<T>(value: T): { value: T };

/**
 * Decorator to create a reactive effect for a method.
 * @param target The target method.
 * @param context The context of the method.
 */
declare function Effect(target: Function, context: { kind: string }): void;

/**
 * Decorator to make a class field reactive.
 * @param target The target class.
 * @param context The context of the field.
 */
declare function Reactive(target: any, context: { kind: string }): (value: any, options?: { deep?: boolean }) => any;

/**
 * Decorator to create a computed property.
 * @param target The target class.
 * @param context The context of the field.
 */
declare function Computed(target: any, context: { kind: string }): void;

/**
 * Decorator to create a reflected property.
 * @param options Options for the reflected property, such as a converter.
 */
declare function Reflected(options?: { converter?: (value: any) => any }): PropertyDecorator;

/**
 * Registers a class as a custom element.
 * @param name The name of the custom element.
 */
declare function CustomElement(name: string): ClassDecorator;

/**
 * Binds a method to the instance of the class.
 * @param target The target method.
 * @param context The context of the method.
 */
declare function Bound(target: Function, context: { kind: string }): void;

export { Bound, Computed, CustomElement, Effect, Inject, Reactive, Reflected, Service, camelCaseToAttributeName, isObject, reactive, ref };
