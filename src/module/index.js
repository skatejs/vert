import { ComponentNext } from '../_';
import { define } from 'skatejs';

export const Module =  define(class extends ComponentNext() {
  static is = 'vert-module'
  static props = {
    args: {},
    load: {},
    done: {}
  }
  propsUpdatedCallback ({ load }) {
    if (typeof load === 'function') {
      load(args => (this.args = args));
    }
  }
  renderCallback ({ args, done }) {
    if (typeof done === 'function') {
      return done(args);
    }
  }
});
