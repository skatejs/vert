import { ChildrenChanged, ComponentNext, decode } from '../_';
import { define, h, prop, props } from 'skatejs';
import { Markdown } from '../markdown';

function parseNotesFromMarkdown (markdown) {
  return markdown.split('\n').reduce((prev, next) => {
    const trimmed = next.trim();
    if (trimmed.substring(0, 2) === '< ') {
      prev.notes.push(trimmed.substring(2));
    } else {
      prev.lines.push(next);
    }
    return prev;
  }, {
    lines: [],
    notes: []
  });
}

export default define(class extends ChildrenChanged(ComponentNext()) {
  static is = 'vert-slide'
  static props = {
    content: prop.string(),
    markdownCss: prop.string()
  }
  childrenChangedCallback () {
    const { lines, notes } = parseNotesFromMarkdown(decode(this.innerHTML));
    const content = lines.join('\n');
    props(this, { content, notes });
  }
  renderCallback ({ content, markdownCss }) {
    return <Markdown css={markdownCss}>{content}</Markdown>;
  }
});
