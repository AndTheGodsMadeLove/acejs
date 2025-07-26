import { attribute, bound, customElement, query, queryAll } from '../src/ace-components.js';
import { effect } from '../src/ace-reactivity.js';
import { jest } from '@jest/globals';

describe('ace-components decorators', () => {

    @customElement('test-element')
    class TestElement extends HTMLElement {
        @attribute
        name = 'John Doe';

        age = 30;

        @query('.name')
        nameElement;

        @queryAll('div')
        tplElements;

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<div class="name">${this.name}</div><div class="age">${this.age}</div>`;
        }

        @bound
        getThis() {
            return this;
        }

        @effect
        nameChangedHandler() {
            console.log(`Name changed to: ${this.name}`);
        }
    }

    const t = new TestElement();
    
    test('@customElement registers a custom element', () => {
        expect(customElements.get('test-element')).toBe(TestElement);
    });

    test('@bound binds method to instance', () => {
        const fn = t.getThis;
        expect(fn()).toBe(t);
    });

    test('@attribute makes property reflected', () => {
        expect(t.name).toBe('John Doe');
        expect(t.getAttribute('name')).toBe('John Doe');
        t.name = 'Jane Doe';
        expect(t.name).toBe('Jane Doe');
        expect(t.getAttribute('name')).toBe('Jane Doe');
    });

    test('@attribute makes property reactive', async () => {
        // the effect decorator rebinds the method to the instance
        // and therefore cannot be tracked by a jest spy
        const logSpy = jest.spyOn(console, 'log');
        t.name = 'New Name';
        // the effect decorator uses microtasks
        // so we need to wait for the next microtask
        await Promise.resolve();
        expect(logSpy).toHaveBeenCalledWith('Name changed to: New Name');
        logSpy.mockRestore();
    });

    test('@query returns the correct element from shadow DOM', () => {
        expect(t.nameElement).not.toBeNull();
        expect(t.nameElement.textContent).toBe('John Doe');
        expect(t.nameElement.className).toBe('name');
    });

    test('@queryAll returns all matching elements from shadow DOM', () => {
        expect(Array.isArray(t.tplElements)).toBe(true);
        expect(t.tplElements.length).toBe(2);
        const texts = Array.from(t.tplElements).map(el => el.textContent);
        expect(texts).toContain('John Doe');
        expect(texts).toContain('30');
    });
});

