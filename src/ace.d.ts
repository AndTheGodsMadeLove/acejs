/** Checks if a value is an object. */
export function isObject(val: any): boolean;

/**
 * Registers a class as a service in the dependency injection container.
 * @param name The name of the service.
 */
export function Service(name: string): ClassDecorator;

/**
 * Injects a service into a field or method.
 * @param name The name of the service to inject.
 */
export function Inject(name: string): PropertyDecorator & MethodDecorator;

/**
 * Decorator to make a class field reactive.
 * @param target The target class.
 * @param context The context of the field.
 */
export function Reactive(target: any, context: { kind: string }): any;

/**
 * Decorator to create a reactive effect for a method.
 * @param target The target method.
 * @param context The context of the method.
 */
export function Effect(target: any, context: { kind: string; addInitializer: (fn: () => void) => void }): void;

/**
 * Decorator to create a computed property.
 * @param target The target class.
 * @param context The context of the field.
 */
export function Computed(target: any, context: { kind: string; name: string; addInitializer: (fn: () => void) => void }): void;

/**
 * Registers a class as a custom element.
 * @param name The name of the custom element.
 */
export function CustomElement(name: string): ClassDecorator;

/**
 * Binds a method to the instance of the class.
 * @param target The target method.
 * @param context The context of the method.
 */
export function Bound(target: any, context: { kind: string; name: string; addInitializer: (fn: () => void) => void }): void;
