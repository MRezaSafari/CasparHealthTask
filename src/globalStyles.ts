import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 30px 0;
    background: #f1f1f1;
    color: #000;
    font-family: 'Open Sans', sans-serif;
  }

  *{
    box-sizing: border-box;
  }

  .container {
    max-width: 1280px;
    margin: auto;
    position: relative;
    padding: 0 15px;
  }

  ul{
    list-style: none;
    padding: 0;
  }

  a{
    text-decoration: none;
  }

 h1,h2,h3,h4,h5,h6{
    margin: 0;
  }
`;

export default GlobalStyle;
