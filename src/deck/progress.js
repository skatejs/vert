import { ComponentNext } from '../_';
import { define, h, prop } from 'skatejs';

export default define(class extends ComponentNext() {
  static props = {
    current: prop.number({ attribute: true, default: 1 }),
    total: prop.number({ attribute: true, default: 1 })
  }
  renderCallback ({ current, total }) {
    return [
      <style>{`
        :host {
          display: block;
        }
        li {
          border: 0;
          color: rgba(0, 0, 0, 0);
          flex-grow: 1;
          font-size: 0;
          height: var(--vert-deck-progress-height, 5px);
          margin: 0;
          padding: 0;
        }
        li[done] {
          background: var(--vert-deck-progress-done-bg, none #4E598C);
        }
        ul {
          background: var(--vert-deck-progress-bg, none #eee);
          border: 0;
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>,
      <ul>
        {Array.from(Array(total)).map((n, i) =>
          <li done={i < current}>Slide {i}</li>)}
      </ul>
    ];
  }
});
