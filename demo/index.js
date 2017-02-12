/** @jsx h */

import 'skatejs-web-components';
import { Component, define, h } from 'skatejs';
import '../src';

function findDecks (e, w) {
  const app = w.document.body.querySelector('vert-app')
  return [app.shadowRoot.getElementById(e.id)];
}

const App = define(class extends Component {
  static is = 'vert-app'
  renderCallback () {
    return [
      <style>{`
        :host {
          font-family: Helvetica;
        }
        vert-deck {
          height: 400px;
        }
        vert-markdown {
          display: block;
        }
      `}</style>,
      <vert-route />,
      <vert-deck id='deck-1' findDecksToControl={findDecks}>
        <vert-slide>{`
          # First slide

          Some talk content.

          < Some notes
        `}</vert-slide>
        <vert-slide>{`
          # Second slide

          Some more content.

          < Some more...

          < notes
        `}</vert-slide>
      </vert-deck>,
      <vert-deck speaker>
        <vert-slide>{`
          # First slide

          Some talk content.

          < Some notes
        `}</vert-slide>
        <vert-slide>{`
          # Second slide

          Some more content.

          < Some more...

          < notes
        `}</vert-slide>
      </vert-deck>,
      <vert-markdown>{`
        # Markdown

        This is some markdown.

        \`\`\`html
        <vert-markdown>
          # Markdown

          This is some markdown.
        </vert-markdown>
        \`\`\`
      `}</vert-markdown>
    ];
  }
});

document.body.appendChild(new App());
