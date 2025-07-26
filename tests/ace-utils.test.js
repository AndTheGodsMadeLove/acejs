import { propertyToAttribute, queryDom } from '../src/ace-utils.js';

describe('ace-utils', () => {
  test('propertyToAttribute sets and removes attributes', () => {
    const el = document.createElement('div');
    propertyToAttribute.call(el, 'foo', 'bar');
    expect(el.getAttribute('foo')).toBe('bar');
    propertyToAttribute.call(el, 'foo', undefined);
    expect(el.hasAttribute('foo')).toBe(false);
  });

  test('queryDom queries single and multiple elements in shadow DOM', () => {
    class TestEl extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<span class="a"></span><span class="a"></span>';
      }
    }
    customElements.define('test-utils-el', TestEl);
    const el = document.createElement('test-utils-el');
    document.body.appendChild(el);
    const single = queryDom(el, '.a', false);
    const all = queryDom(el, '.a', true);
    expect(single).not.toBeNull();
    expect(all.length).toBe(2);
    document.body.removeChild(el);
  });
});
