import { ComponentNext } from '../_';
import { define, prop } from 'skatejs';

const { localStorage } = window;

export const Store = define(class extends ComponentNext() {
  static props = {
    id: prop.string({ attribute: true }),
    name: prop.string({ attribute: true }),
    value: prop.string({ attribute: true })
  }
  static get (name, { id }) {
    return JSON.parse(localStorage.getItem(id + name));
  }
  static set (name, value, { id }) {
    return localStorage.setItem(id + name, JSON.stringify(value));
  }
  propsChangedCallback ({ id, name, value }) {
    localStorage.setItem(id + name, value);
  }
});
