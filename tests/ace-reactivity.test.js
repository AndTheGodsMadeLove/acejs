import { effect, computed, property, state } from '../src/ace-reactivity.js';
import { jest } from '@jest/globals';

describe('ace-reactivity', () => {
  test('@state makes a field reactive', async () => {
    class Test {
      @state
      person = { age: 30  };

      @effect
      onAgeChange() {
        console.log('Age changed:', this.person.age);
      }
    }
    const logSpy = jest.spyOn(console, 'log');
    const t = new Test();
    t.person.age = 35;

    await Promise.resolve();
    expect(logSpy).toHaveBeenCalledWith('Age changed:', 35);
    logSpy.mockRestore();
  });

  test('@property makes a field reactive', async () => {
    class Test {
      @property
      age = 30;

      @effect
      onAgeChange() {
        console.log('Age changed:', this.age);
      }
    }
    const logSpy = jest.spyOn(console, 'log');
    const t = new Test();
    t.age = 35;

    await Promise.resolve();
    expect(logSpy).toHaveBeenCalledWith('Age changed:', 35);
    logSpy.mockRestore();
  });

  test('@computed creates a computed property', () => {
    class Test {
      @state
      state = {
        count: 2,
      };

      @computed
      double = () => this.state.count * 2;
    }
    const t = new Test();
    expect(t.double).toBe(4);
    t.state.count = 3;
    queueMicrotask(() => {
      expect(t.double).toBe(6);
    });
  });

});
