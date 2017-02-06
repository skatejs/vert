import { ComponentNext } from '../_';
import { define, h, prop } from 'skatejs';
import styles from '../markdown/styles';

export default define(class extends ComponentNext() {
  static props = {
    notes: prop.array({ attribute: true })
  }
  renderCallback ({ notes }) {
    return [
      <style>{`
        :host {
          background-color: #FFD9CE;
          display: block;
          padding: 0 20px;
        }
        ${styles}
      `}</style>
    ].concat(notes.map(n => <p ref={e => (e.innerHTML = marked(n, renderer))} />));
  }
});
