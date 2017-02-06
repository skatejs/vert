import { ChildrenChanged, ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';
import { Store } from '../store';
import Notes from './notes';
import Progress from './progress';

const keys = {
  37 (elem, e) {
    const { actualSelected, children } = elem;
    props(elem, {
      selected: actualSelected > 1 ? actualSelected - 1 : children.length
    });
  },
  39 (elem, e) {
    const { actualSelected, children } = elem;
    props(elem, {
      selected: actualSelected < children.length ? actualSelected + 1 : 1
    });
  }
};

export default define(class extends ChildrenChanged(ComponentNext()) {
  static is = 'vert-deck';
  static props = {
    focused: prop.boolean({ attribute: true }),
    id: prop.string({ attribute: true }),
    selected: prop.number({ attribute: true })
  }
  get actualSelected () {
    return this.selected || Store.get('currentSlide', this) || 1;
  }
  get slide () {
    const { actualSelected, children } = this;
    return children[actualSelected - 1];
  }
  handleClick = e => {
    e.currentTarget.focus();
  }
  handleRef = e => {
    if (this.focused) {
      e.focus();
    }
  }
  handleKeydown = e => {
    const handler = keys[e.keyCode];
    if (handler) {
      handler(this, e);
    }
  }
  renderCallback ({ actualSelected, children, handleClick, handleKeydown, handleRef, id }) {
    const { notes } = this.slide || {};
    return [
      <style>{`
        :host {
          display: flex;
          flex-direction: column;
        }
        .container {
          flex: 1;
        }
        .notes {
          bottom: 10px;
          position: fixed;
          right: 10px;
          width: 300px;
        }
        ::slotted(*) {
          display: none;
        }
        ::slotted(:nth-child(${actualSelected})) {
          display: block;
        }
      `}</style>,
      <div class="container" onclick={handleClick} onkeydown={handleKeydown} tabindex="0" ref={handleRef}>
        <Store id={id} name="currentSlide" value={actualSelected} />
        <Progress current={actualSelected} total={children.length} />
        <Notes class="notes" notes={notes} />
        <slot  />
      </div>
    ];
  }
});
