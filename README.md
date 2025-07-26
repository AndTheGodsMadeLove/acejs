# another web component

Small helper library for web components created to explore decorators proposal

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

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...
}

customElements.getName(MyHeader); // my-header
```

### `@bound`
Binds a method to the instance of the class.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...

  @bound
  getBoundThis() {
    return this;
  }

  getThis() {
    return this;
  }
}

const header = new MyHeader();
header.getBoundThis.apply(String) === header // true
header.getThis.apply(String) === header // false
```


### `@state`
Makes a class field reactive.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...

  @state
  user = {
    name: 'John Doe',
    age: 42,
  };

  @effect
  onUserChange() {
    console.log(`User changed: ${JSON.stringify(this.user)}`);
  }

  @effect
  onNameChange() {
    console.log(`Username changed to: ${this.user.name}`);
  }
}

const header = new MyHeader();
header.user.name = 'Jimi Hendrix';
// User changed: {"name":"Jimi Hendrix","age":42}
// Username changed to: Jimi Hendrix
header.user.age = 27;
// User changed: {"name":"Jimi Hendrix","age":27}
```

### `@effect`
Creates a reactive effect for a method.

### `@attribute`
Makes a property reactive and reflects it to an attribute.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...

  @attribute
  title = 'Default Title';

  @effect
  updateTitle() {
    console.log(`New Title: "${this.title}"`);
  }
}

const header = new MyHeader();
header.title = 'Hello World';
// New Title: "Hello World"
header.getAttribute('title') // Hello World

header.setAttribute('title', 'Hello Jimi');
// New Title: Hello Jimi
header.title === 'Hello Jimi'; // true
```

### `@computed`
Creates a computed property that updates automatically when its dependencies change.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...

  @state
  user = {
    name: 'John Doe',
    age: 42,
  };

  @computed
  doubledAge = () => this.user.age * 2;

  @effect
  doSomething() {
    console.log(`Doubled age: ${this.doubledAge}`);
  }
}

const header = new MyHeader();
header.user.age = 4;
// Doubled age: 8
header.user.age = 21;
// Doubled age: 42
```

### `@property`
Makes a class field a reactive reference.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  // ...
  @property
  age = 42;

  @effect
  doSomething() {
    console.log(`Age changed to: ${this.age.value}`);
  }
}

const header = new MyHeader();
header.age = 24;
// Age changed to: 24
```

### `@query`
Queries a single element by CSS selector in the component's shadow DOM.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  @query('button')
  buttonElement;

  constructor() {
  super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<button>click me</button>';
  }
}

const header = new MyHeader();
header.buttonElement // <button>click me</button>
```

### `@queryAll`
Queries all elements by CSS selector in the component's shadow DOM.

```javascript
@customElement('my-header')
class MyHeader extends HTMLElement {
  @queryAll('button')
  buttonElements;

  constructor() {
  super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<button>A</button><button>B</button>`;
  }
}

const header = new MyHeader();
header.buttonElements.length // 2
```

### `@provide`
Registers a class as a service in the dependency injection container.

### `@inject`
Injects a service into a field or method.

```javascript
@provide('User')
class User {
  name = 'Jimi';
}

@provide
class Logger {
  log(msg) {
    console.log('Logger:', msg);
  }
}

class Test {
  @inject('Logger')
  logger;

  @inject('User')
  logUser(user) {
    this.logger.log(user.name)
  }
}

const t = new Test();
t.logUser();
// Logger: Jimi
```
