import { Component, props } from 'skatejs';

const textarea = document.createElement('textarea');

export const ComponentNext = (Base = Component) => class extends Base {
  propsChangedCallback () {}
  shouldRenderCallback (next, prev) {
    return super.updatedCallback(prev);
  }
  updatedCallback (prev) {
    const next = props(this);
    if (this.shouldRenderCallback(next, prev)) {
      this.propsChangedCallback(next, prev);
      return true;
    }
  }
};

export const ChildrenChanged = (Base = HTMLElement) => class extends Base {
  childrenChangedCallback () {}
  connectedCallback () {
    super.connectedCallback();
    const mo = new MutationObserver(this.childrenChangedCallback.bind(this));
    mo.observe(this, { childList: true });
    this.childrenChangedCallback();
  }
};

export function decode (html) {
  textarea.innerHTML = html;
  return textarea.value;
}
