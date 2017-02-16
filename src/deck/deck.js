import { ChildrenChanged, ComponentNext } from '../_';
import { define, h, prop, props } from 'skatejs';
import animatecss from '!css-loader!animate.css';

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

function getAnimation (i, actualSelected, forward) {
  const num = i + 1;
  const isCurr = num === actualSelected;
  if (isCurr) {
    return `fadeIn fadeOut slide${forward ? 'InRight' : 'InLeft'}`;
  }
  return 'fadeOut';
}

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
      ${animatecss}

      :host {
        display: flex;
        flex-direction: column;
        font-size: 1.4rem;
        overflow-x: hidden;
      }

      .container {
        box-sizing: border-box;
        flex: 1;
        outline: none;
        padding-top: 5px;
      }

      .slide {
        animation-duration: var(--vert-deck-slide-animation-duration, .3s);
        display: block;
        position: relative;
        z-index: 1;
      }
      .slides {
        margin: var(--vert-deck-slide-margin, auto);
        max-width: var(--vert-deck-slide-width, 800px);
        padding: var(--vert-deck-slide-padding, 0);
        position: relative;
      }

      .fadeOut {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 0;
      }

      .speaker {
        margin: 20px;
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
  propsChangedCallback ({ selected }, { selected: prevSelected } = {}) {
    this._forward = prevSelected < selected;
    this.decks.forEach(d => props(d, { selected }));
  }
  renderCallback ({
    _forward,
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
        {ifSpeaker(
          <div class="speaker">
            <Timer class="timer" />
            <Time class="time" slides={slides} />
            <div>{actualSelected} / {slides.length}</div>
            <Notes class="notes" notes={notes} />
          </div>
        )}
        {ifNotSpeaker(
          <div class="slides">
            {this.slides.map((s, i) => {
              const animation = getAnimation(i, actualSelected, _forward);
              return <Slide class={`slide animated ${animation}`} ref={e => (e.innerHTML = s.innerHTML)} />
            })}
          </div>
        )}
      </div>
    ];
  }
});
