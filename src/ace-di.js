/**
 * A simple dependency injection container.
 * Stores services by name and provides them when requested.
 */
const container = new Map();

/**
 * Registers a class as a service in the dependency injection container.
 * @param {string} name - The name of the service.
 * @returns {ClassDecorator} - A decorator function for classes.
 */
export function Service(name) {
  return function (target, context) {
    if (context.kind !== 'class') {
      throw new Error(`@Service can only be used on classes, not on "${context.kind}"`);
    }
    container.set(name, new target());
  };
}

/**
 * Injects a service into a field or method.
 * @param {string} name - The name of the service to inject.
 * @returns {FieldDecorator|MethodDecorator} - A decorator function for fields or methods.
 */
export function Inject(name) {
  return function (target, context) {
    if (context.kind === 'field') {
      return () => container.get(name);
    } else if (context.kind === 'method') {
      return function (...args) {
        const service = container.get(name);
        return target.apply(this, [...args, service]);
      };
    }
  };
}

/**
 * A simple logger service.
 * Provides logging functionality.
 */
@Service('Logger')
class Logger {
  /**
   * Logs a message to the console.
   * @param {string} message - The message to log.
   */
  log(message) {
    console.log(`Log: ${message}`);
  }
}