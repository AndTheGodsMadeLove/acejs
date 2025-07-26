import { provide, inject } from '../src/ace-di.js';

describe('ace-di decorators', () => {
  test('@inject injects a service', () => {
    @provide('myService')
    class MyService {}

    class Test {
      @inject('myService')
      service;
    }
    const t = new Test();
    expect('service' in t).toBe(t.service instanceof MyService);
  });
});
