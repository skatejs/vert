import { ChildrenChanged, ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';
import { Store } from '../store';
import Notes from './notes';
import Progress from './progress';
import Time from './time';
import Timer from './timer';
import Window from '../window';

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
  },
  83 (elem, e) {
    props(elem, { speaker: !elem.speaker });
  },
  87 (elem, e) {
    props(elem, { win: !elem.win });
  }
};

export default define(class extends ChildrenChanged(ComponentNext()) {
  static is = 'vert-deck';
  static props = {
    decks: prop.array(),
    findDecksToControl: {},
    focused: prop.boolean({ attribute: true }),
    hovered: prop.boolean({ attribute: true }),
    id: prop.string({ attribute: true }),
    mouseX: prop.number(),
    mouseY: prop.number(),
    speaker: prop.boolean({ attribute: true }),
    selected: prop.number({ attribute: true }),
    slides: prop.array(),
    win: prop.boolean({ attribute: true })
  }
  get actualSelected () {
    return this.selected || Store.get('currentSlide', this) || 1;
  }
  get slide () {
    const { actualSelected, slides } = this;
    return slides[actualSelected - 1];
  }
  get style () {
    return `
      :host {
        cursor: ${this.speaker ? 'default' : 'none'};
        display: flex;
        flex-direction: column;
      }
      .container {
        flex: 1;
        outline: none;
        padding: 20px;
        position: relative;
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
        display: inline-block;
        font-size: 1.5rem;
      }
      .time {
        float: right;
      }
      ::slotted(*) {
        display: none;
      }
      ::slotted(:nth-child(${this.actualSelected})) {
        display: block;
      }
    `;
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
  handleMouseout = e => {
    props(this, { hovered: false });
  }
  handleMouseover = e => {
    props(this, { hovered: true });
  }
  handleDone = w => {
    const { findDecksToControl } = this;
    if (findDecksToControl) {
      const decks = this.decks = Array.from(findDecksToControl(this, w));
      decks.forEach(d => props(d, { selected: this.actualSelected }));
    }
  }
  findDecksToControl (e, w) {
    return w.document.body.querySelectorAll(e.localName);
  }
  childrenChangedCallback () {
    props(this, { slides: Array.from(this.children) });
  }
  propsChangedCallback ({ selected }) {
    this.decks.forEach(d => props(d, { selected }));
  }
  renderCallback ({
    actualSelected,
    handleClick,
    handleDone,
    handleKeydown,
    handleMousemove,
    handleMouseout,
    handleMouseover,
    handleRef,
    hovered,
    id,
    mouseX,
    mouseY,
    slides,
    speaker,
    win
  }) {
    const { notes } = this.slide || {};

    function ifSpeaker (ret) {
      return speaker ? ret : null;
    }

    function ifNotSpeaker (ret) {
      return speaker ? null : ret;
    }

    return [
      <style>{this.style}</style>,
      win ? <Window done={handleDone} height={800} location="." width={500} /> : null,
      ifNotSpeaker(hovered ? <div class="cursor" style={{ left: `${mouseX}px`, top: `${mouseY}px` }} /> : null),
      ifNotSpeaker(<Progress current={actualSelected} total={slides.length} />),
      <div
        class="container"
        onmousemove={ifNotSpeaker(handleMousemove)}
        onmouseout={handleMouseout}
        onmouseover={handleMouseover}
        onclick={handleClick} 
        onkeydown={handleKeydown} 
        tabindex="0" 
        ref={e => (e.focus())}
      >
        <Store id={id} name="currentSlide" value={actualSelected} />
        {ifSpeaker([
          <Timer class="timer" />,
          <Time class="time" slides={slides} />,
          <div>{actualSelected} / {slides.length}</div>,
          <Notes class="notes" notes={notes} />
        ])}
        {ifNotSpeaker(<slot />)}
      </div>
    ];
  }
});
