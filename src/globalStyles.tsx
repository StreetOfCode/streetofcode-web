import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    font-family: soleil, 'Lato', sans-serif;
    font-style: normal;

    margin: 0;
    padding: 0;

    background-color: var(--color-primary);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  img {
      display: block;
      max-width: 100%;
  }

  li {
    color: var(--color-secondary);
  }

  a {
    color: var(--color-accent);
  }

  .grecaptcha-badge {
    visibility: hidden;
  }
`

export default GlobalStyles
