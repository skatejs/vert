import { ComponentNext } from '../_';
import { define, h, prop } from 'skatejs';

export default define(class extends ComponentNext() {
  static props = {
    current: prop.number({ attribute: true, default: 1 }),
    total: prop.number({ attribute: true, default: 1 })
  }
  renderCallback ({ current, total }) {
    console.log(current, total);
    return [
      <style>{`
        :host {
          display: block;
        }
        li {
          color: rgba(0, 0, 0, 0);
          flex-grow: 1;
          height: 5px;
          margin: 0;
          padding: 0;
        }
        li[done] {
          background-color: #4E598C;
        }
        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }
      `}</style>,
      <ul>
        {Array.from(Array(total)).map((n, i) =>
          <li done={i < current}>Slide {i}</li>)}
      </ul>
    ];
  }
});
