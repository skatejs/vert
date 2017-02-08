import { ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';

function pad (num) {
  return num > 9 ? num : `0${num}`;
}

export default define(class extends ComponentNext() {
  static props = {
    count: prop.number()
  }
  get hours () {
    return Math.floor(this.minutes / 60);
  }
  get minutes () {
    return Math.floor(this.count / 60);
  }
  get seconds () {
    return Math.floor(this.count % 60);
  }
  connectedCallback () {
    super.connectedCallback();
    this.ival = setInterval(() => props(this, { count: this.count + 1 }), 1000);
  }
  disconnectedCallback () {
    super.disconnectedCallback();
    clearInterval(this.ival);
  }
  renderCallback ({ hours, minutes, seconds }) {
    return (
      <span>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
    );
  }
});
