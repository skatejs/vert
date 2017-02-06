import { define, prop } from 'skatejs';
import { ComponentNext } from '../_';
import page from 'page';

const registered = [];

export const Route = define(class extends ComponentNext() {
  static is = 'vert-route'
  static props = {
    match: {},
    matched: prop.boolean({ attribute: true }),
    path: prop.string({ attribute: true }),
  }
  propsUpdatedCallback ({ path }) {
    if (registered.indexOf(path) === -1) {
      registered.push(path);
      page(path, () => (this.matched = true));
      page.exit(path, (args, next) => {
        this.matched = false;
        next();
      });
      if (path === window.location.pathname) {
        page(path);
      }
    }
  }
  renderCallback ({ match, matched }) {
    return matched && match();
  }
});
