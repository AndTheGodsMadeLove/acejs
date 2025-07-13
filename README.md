# acejs

A lightweight JavaScript library for web components.

## Dependencies

This library relies on the [Decorators Proposal](https://github.com/tc39/proposal-decorators), which is currently in Stage 3 of the TC39 process. To use this library, you need to ensure that your JavaScript environment supports decorators or use a transpiler like Babel or TypeScript with the appropriate configuration.

### Setting Up Decorators

To enable decorators in your project:

1. **Using Babel**:
   Install the necessary plugins:
   ```bash
   npm install --save-dev @babel/plugin-proposal-decorators
   ```
   
   Update your Babel configuration:
   ```json
   {
     "plugins": [["@babel/plugin-proposal-decorators", { "version": "2023-11" }]]
   }
   ```

2. **Using TypeScript**:
   Enable decorators in your `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true
     }
   }
   ```

## Decorators

### `@CustomElement`
Registers a class as a custom element.

### `@Bound`
Binds a method to the instance of the class.

### `@Reflected`
Makes a property reactive and reflects it to an attribute.

### `@Reactive`
Makes a class field reactive.

### `@Effect`
Creates a reactive effect for a method.

### `@Computed`
Creates a computed property that updates automatically when its dependencies change.

### `@Ref`
Makes a class field a reactive reference.

### `@Service`
Registers a class as a service in the dependency injection container.

### `@Inject`
Injects a service into a field or method.
