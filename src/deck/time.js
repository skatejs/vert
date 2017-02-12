import { ComponentNext } from '../_';
import { define, h, prop } from 'skatejs';

export default define(class extends ComponentNext() {
  static props = {
    slides: prop.array()
  }
  renderCallback ({ slides }) {
    const time = slides.reduce((prev, next) => {
      return prev + (next.textContent || '').split(' ').length / 3;
    }, 0);
    return (
      <span>{Math.round(time / 60)} min</span>
    );
  }
});
