/**
 * Decorator to query an element by CSS selector in shadow DOM.
 * @param selector The CSS selector.
 * @returns A PropertyDecorator.
 */
export declare function query(selector: string): PropertyDecorator;
/**
 * Decorator to query all elements by CSS selector in shadow DOM.
 * @param selector The CSS selector.
 * @returns A PropertyDecorator.
 */
export declare function queryAll(selector: string): PropertyDecorator;
/**
 * Checks if a value is an object.
 * @param val The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export declare function isObject(val: any): boolean;

/**
 * Converts a camelCase string to a dash-case attribute name.
 * @param str The camelCase string to convert.
 * @returns The converted attribute name.
 */
export declare function camelCaseToAttributeName(str: string): string;

/**
 * Registers a class as a service in the dependency injection container.
 * @param name The name of the service.
 * @returns A class decorator.
 */
export declare function provide(name: string): ClassDecorator;

/**
 * Injects a service into a field or method.
 * @param name The name of the service to inject.
 * @returns A property or method decorator.
 */
export declare function inject(name: string): PropertyDecorator | MethodDecorator;

/**
 * Makes an object or array reactive.
 * @param target The target object or array.
 * @param options Options for reactivity, such as deep observation.
 * @returns The reactive proxy.
 */
export declare function reactive<T>(target: T, options?: { deep?: boolean }): T;

/**
 * Decorator to create a reactive effect for a method.
 * @param target The target method.
 * @param context The context of the method.
 */
export declare function effect(target: Function, context: { kind: string }): void;

/**
 * Decorator to make a class field reactive.
 * @param target The target class.
 * @param context The context of the field.
 * @returns A function to initialize the reactive field.
 */
export declare function state(target: any, context: { kind: string }): (value: any, options?: { deep?: boolean }) => any;

/**
 * Decorator to create a computed property.
 * @param target The target class.
 * @param context The context of the field.
 */
export declare function computed(target: any, context: { kind: string }): void;

/**
 * Decorator to make a class field a reactive reference.
 * @param target The target class.
 * @param context The context of the field.
 */
export declare function property(target: any, context: { kind: string }): void;

/**
 * Registers a class as a custom element.
 * @param name The name of the custom element.
 * @returns A class decorator.
 */
export declare function customElement(name: string): ClassDecorator;

/**
 * Binds a method to the instance of the class.
 * @param target The target method.
 * @param context The context of the method.
 * @returns A method decorator.
 */
export declare function bound(target: Function, context: { kind: string }): void;

/**
 * Makes a property reactive and reflects it to an attribute.
 * @param options Options for the reflected property.
 * @param converter A function to convert the attribute value to a property value.
 * @returns A property decorator.
 */
export declare function attribute(options?: { converter?: (value: any) => any }): PropertyDecorator;
