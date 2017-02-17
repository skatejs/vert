# vert

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

**EXPERIMENTAL**

Vert is currently an experimental dumping ground for components that are built in SkateJS. Over time, we hope to polish it and release it as an official set of web components. How this will eventually be delivered is still under consideration.

## `<vert-deck>`

The `vert-deck` component is for authoring presentation slides using just HTML and Markdown.

```html
<vert-deck focused>
  <div>
    # Slide 1

    Talk intro.
  </div>
  <div>
    # Slide 2

    - item 1
    - item 2

    ```js
    // maybe some code
    ```
  </div>
</vert-deck>
```

### Props

Each prop as a corresponding attribute that is the `dash-cased` version of the `camelCased` name specified below.

- `focused` &mdash; Whether or not the deck has focus. You can only interact with the deck when it is focused.
- `id` &mdash; Used in conjunction with the speaker notes (by default) to link the speaker deck and main deck.
- `speaker` &mdash; Whether or not the deck is in speaker mode. When togged this switches the view while keeping your spot.
- `selected` &mdash; The slide number that should be selected.
- `slideMarkdownCss` &mdash; Any custom styles to pass down to the markdown component.
- `win` &mdash; Whether or not to open a new window using the current location. The deck in the opening window will control the deck in the new window. This allows you to use speaker notes in one of the windows while controlling one or more decks from the deck in the opening window.

### Authoring speaker notes

The `vert-deck` component also includes a `vert-slide` component that provides additional information to the deck. With it, you can use a custom Markdown token to write speaker notes that appear in the speaker view.

```html
<vert-deck>
  <vert-slide>
    # Heading

    Some content.

    < These are your speaker notes. They don't appear in the main view.

    < They accept standard markdown; all you do is prefix your markdown with a `<`. This means you can still write code:

    < ```js
    <   // some code
    < ```

    < And even write lists:

    < - Item 1
    < - Item 2
  </vert-slide>
</vert-deck>
```

### Moving through slides

While the deck has focus, you can move through slides by pressing &larr; or &rarr;.

*You may alternatively specify the `selected` prop.*

### Speaker view

To switch to speaker mode, you can press `s` when the deck has focus.

*You may alternatively specify the `speaker` prop.*

### New window

When the deck is focused, you may open your deck in a new window by pressing `w`. You can use this in conjunction with `s` so your speaker notes are in one of the windows. You can then use the parent window to control the deck in the child window.

*You may alternatively specify the `win` prop.*
