import { ChildrenChanged, ComponentNext, decode } from '../_';
import { define, h, prop, props } from 'skatejs';
import hljs from 'highlight.js';
import hlcss from '!css-loader!highlight.js/styles/monokai.css';
import marked from 'marked';
import styles from './styles';

const renderer = new marked.Renderer();

renderer.code = (code, lang) => {
  return `<pre><code>${hljs.highlightAuto(code, [lang]).value}</code></pre>`;
};

function parse (markdown) {
  const lines = markdown.split('\n');
  const firstLine = lines.filter(Boolean)[0];
  const indent = firstLine && firstLine.match(/^\s*/)[0].length;
  return lines.map(t => t.substring(indent)).join('\n');
}

export const Markdown = define(class extends ChildrenChanged(ComponentNext()) {
  static is = 'vert-markdown'
  static props = {
    content: prop.string()
  }
  childrenChangedCallback () {
    props(this, { content: parse(decode(this.innerHTML)) });
  }
  renderCallback ({ content }) {
    return [
      <style>{styles}</style>,
      <style>{hlcss.toString()}</style>,
      <div ref={e => (e.innerHTML = marked(content, { renderer }))} />
    ];
  }
});
