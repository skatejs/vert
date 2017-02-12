import { Component, props } from 'skatejs';

const { HTMLElement, MutationObserver } = window;
const textarea = document.createElement('textarea');


// Functions

export function decode (html) {
  textarea.innerHTML = html;
  return textarea.value;
}


// Mixins

export const ComponentNext = (Base = Component) => class extends Base {
  propsChangedCallback () {}
  shouldRenderCallback (next, prev) {
    return super.updatedCallback(prev);
  }
  updatedCallback (prev) {
    const next = props(this);
    if (this.propsSetCallback) {
      this.propsSetCallback(next, prev);
    }
    if (this.shouldRenderCallback(next, prev)) {
      this.propsChangedCallback(next, prev);
      return true;
    }
  }
};

export const ChildrenChanged = (Base = HTMLElement) => class extends Base {
  connectedCallback () {
    super.connectedCallback();
    if (this.childrenChangedCallback) {
      const mo = new MutationObserver(this.childrenChangedCallback.bind(this));
      mo.observe(this, { childList: true });
      this.childrenChangedCallback();
    }
  }
};

export const Portal = (Base = HTMLElement) => class extends Base {
  get shadowRoot () {
    return this.portal;
  }
  attachShadow () {
    return this.portal;
  }
};
