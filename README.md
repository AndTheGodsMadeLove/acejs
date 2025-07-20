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

3. **Using Vite**
   Install dependencies

   ```bash
   npm install --save-dev @babel/core @babel/plugin-proposal-decorators @rollup/pluginutils
   ```

   Create a vite plugin to enable decorators for your project
   ```javascript
   import { createFilter } from '@rollup/pluginutils';
   import babel from '@babel/core';

   export default function decoratorsPlugin(options = {}) {
     const filter = createFilter(options.include, options.exclude);

     return {
       name: 'vite-plugin-decorators',

       transform(code, id) {
         if (!filter(id)) return null;

         const result = babel.transformSync(code, {
           filename: id,
           plugins: [
             [
               '@babel/plugin-proposal-decorators',
               { version: '2023-11' },
             ],
           ],
         });

         return {
           code: result.code,
           map: result.map,
         };
       },
     };
   }
   ```

   Use the plugin in the vite configuration
   ```javascript
   import { defineConfig } from 'vite';
   import decoratorsPlugin from './vite-plugin-decorators';
   import path from 'path';

   export default defineConfig({
     plugins: [
       decoratorsPlugin({
         include: [
           'src/**/*.js',
         ],
       }),
     ],
   });
   ```

## Decorators

### `@customElement`
Registers a class as a custom element.

### `@bound`
Binds a method to the instance of the class.

### `@attribute`
Makes a property reactive and reflects it to an attribute.

### `@state`
Makes a class field reactive.

### `@effect`
Creates a reactive effect for a method.

### `@computed`
Creates a computed property that updates automatically when its dependencies change.

### `@property`
Makes a class field a reactive reference.

### `@provide`
Registers a class as a service in the dependency injection container.

### `@inject`
Injects a service into a field or method.

### `@query`
Queries a single element by CSS selector in the component's shadow DOM.

### `@queryAll`
Queries all elements by CSS selector in the component's shadow DOM.
