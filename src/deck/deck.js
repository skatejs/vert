import { ChildrenChanged, ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';
import { Store } from '../store';
import Notes from './notes';
import Progress from './progress';
import Time from './time';
import Timer from './timer';

const keys = {
  37 (elem, e) {
    const { actualSelected, slides } = elem;
    props(elem, {
      selected: actualSelected > 1 ? actualSelected - 1 : slides.length
    });
  },
  39 (elem, e) {
    const { actualSelected, slides } = elem;
    props(elem, {
      selected: actualSelected < slides.length ? actualSelected + 1 : 1
    });
  }
};

export default define(class extends ChildrenChanged(ComponentNext()) {
  static is = 'vert-deck';
  static props = {
    focused: prop.boolean({ attribute: true }),
    id: prop.string({ attribute: true }),
    mouseX: prop.number(),
    mouseY: prop.number(),
    selected: prop.number({ attribute: true }),
    slides: prop.array()
  }
  get actualSelected () {
    return this.selected || Store.get('currentSlide', this) || 1;
  }
  get slide () {
    const { actualSelected, slides } = this;
    return slides[actualSelected - 1];
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
  handleMousemove = e => {
    const { pageX: mouseX, pageY: mouseY } = e;
    props(this, { mouseX, mouseY });
  }
  childrenChangedCallback () {
    props(this, { slides: Array.from(this.children) });
  }
  renderCallback ({
    actualSelected,
    handleClick,
    handleKeydown,
    handleMousemove,
    handleRef,
    id,
    mouseX,
    mouseY,
    slides
  }) {
    const { notes } = this.slide || {};
    return [
      <style>{`
        :host {
          cursor: none;
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
        .cursor {
          background-color: black;
          border-radius: 20px;
          height: 20px;
          opacity: .75;
          position: absolute;
          width: 20px;
        }
        .time,
        .timer {
          display: block;
          font-size: 1.5rem;
          position: absolute;
          top: 10px;
        }
        .time {
          right: 10px;
        }
        .timer {
          left: 10px;
        }
        .top {
          position: relative;
        }
        ::slotted(*) {
          display: none;
        }
        ::slotted(:nth-child(${actualSelected})) {
          display: block;
        }
      `}</style>,
      <div class="cursor" style={{ left: `${mouseX}px`, top: `${mouseY}px` }} />,
      <div
        class="container"
        onmousemove={handleMousemove} 
        onclick={handleClick} 
        onkeydown={handleKeydown} 
        tabindex="0" 
        ref={handleRef}
      >
        <div class="top">
          <Store id={id} name="currentSlide" value={actualSelected} />
          <Progress current={actualSelected} total={slides.length} />
          <Notes class="notes" notes={notes} />
          <Timer class="timer" />
          <Time class="time" slides={slides} />
        </div>
        <slot />
      </div>
    ];
  }
});
