import { ComponentNext, marked } from '../_';
import { define, h, prop } from 'skatejs';
import { parse } from '../markdown';
import styles from '../markdown/styles';

export default define(class extends ComponentNext() {
  static props = {
    notes: prop.array({ attribute: true })
  }
  renderCallback ({ notes }) {
    return [
      <style>{`
        :host {
          display: block;
        }
        ${styles}
      `}</style>
    ].concat(notes.map(n => <p ref={e => (e.innerHTML = parse(n))} />));
  }
});
