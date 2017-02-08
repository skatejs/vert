/** @jsx h */

import 'skatejs-web-components';
import { Component, define, h } from 'skatejs';
import '../src';

const App = define(class extends Component {
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
        vert-slide {
          padding: 40px 20px 20px 20px;
        }
      `}</style>,
      <vert-route />,
      <vert-deck>
        <vert-slide>{`
          # First slide

          Some talk content.
        `}</vert-slide>
        <vert-slide>{`
          # Second slide

          Some more content.
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
