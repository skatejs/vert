import { ChildrenChanged, ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';
import { Store } from '../store';
import Notes from './notes';
import Progress from './progress';
import Slide from './slide';
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
    id: prop.string({ attribute: true }),
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
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
      }
      .container {
        box-sizing: border-box;
        flex: 1;
        outline: none;
        padding-top: 5px;
      }
      .slide {
        flex: 1;
        transition: .1s;
      }
      ${Array.from(Array(this.slides.length)).map((n, i) => {
        const num = i + 1;
        return `
          .slide:nth-child(${num}) {
            transform: translateX(${(num - this.actualSelected) * 100}%);
          }
        `;
      }).join('')}
      .slides {
        display: flex;
        width: ${this.slides.length * 100}%;
      }
      .time,
      .timer {
        display: inline-block;
        font-size: 1.5rem;
      }
      .time {
        float: right;
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
      ifNotSpeaker(<Progress current={actualSelected} total={slides.length} />),
      <div
        class="container"
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
        {ifNotSpeaker(
          <div class="slides">
            {this.slides.map((s, i) => (
              <Slide class="slide" selected={i === actualSelected}>{s.textContent}</Slide>
            ))}
          </div>
        )}
      </div>
    ];
  }
});
