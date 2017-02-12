import { ComponentNext } from '../_';
import { Component, define, prop } from 'skatejs';

export default define(class extends ComponentNext() {
  static props = {
    done: {},
    height: prop.number({ default: 640 }),
    left: prop.number(),
    location: prop.string({ default: 'about:blank' }),
    parent: {},
    top: prop.number(),
    width: prop.number({ default: 480 })
  }
  get portal () {
    return this.win.document.body;
  }
  connectedCallback () {
    super.connectedCallback();
    const win = this.win = window.open('', '', 'width=someValueToMakeItOpenInNewWindow');
    win.onunload = () => {
      setTimeout(() => {
        win.addEventListener('DOMContentLoaded', () => {
          this.done(win);
        });
      });
    };
  }
  disconnectedCallback () {
    this.win.close();
    super.disconnectedCallback();
  }
  propsChangedCallback ({ height, left, location, top, width }) {
    const { win } = this;
    win.location = location;
    win.moveTo(left, top);
    win.resizeTo(width, height);
  }
});
