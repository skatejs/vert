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
      <vert-deck
        id='deck-1'
        findDecksToControl={findDecks}
        slideMarkdownCss={`
          h1 {
            text-align: center;
          }
        `}
      >
        {Array.from(Array(20)).map((n, i) => <vert-slide>{`
          # Slide ${i + 1}

          ${Array.from(Array(20)).map(() => {
            return `Paragraph ${Array.from(Array(20)).map(() => {
              return `paragraph`;
            }).join(' ')}.`;
          }).join('\n\n          ')}

          < Slide note ${i + 1}
        `}</vert-slide>)}
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
