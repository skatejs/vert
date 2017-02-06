// Colour palette: https://coolors.co/4e598c-ffd9ce-f9c784-fcaf58-ff8c42
//
// - #4E598C (purple navy)
// - #FFD9CE (unbleached silk)
// - #F9C784 (topaz)
// - #FCAF58 (rajah)
// - #FF8C42 (mango tango)

export default  `
  a {
    color: #4E598C;
    text-decoration: none;
  }
  blockquote {
    border-left: 4px solid #FF8C42;
    color: #333;
    margin: 20px 0;
    padding: 10px 20px;
  }
  blockquote p:first-of-type {
    margin-top: 0;
  }
  blockquote p:last-of-type {
    margin-bottom: 0;
  }
  h1 {
    margin: 0;
    margin-bottom: 20px;
  }
  li {
    margin: 5px;
    padding: 0;
  }
  pre {
    background-color: #4E598C;
    color: #fff;
    padding: 20px;
  }
  sup {
    display: inline-block;
    padding-left: 5px;
  }
  ul {
    list-style-type: disc;
    margin: 20px 0;
    padding: 0 0 0 20px;
  }
  ul ul {
    margin-top: 0;
    padding-left: 10px;
  }
`;
