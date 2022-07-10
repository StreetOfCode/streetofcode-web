import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    font-family: soleil, sans-serif;
    font-style: normal;

    margin: 0;
    padding: 0;
  }


  * {
    box-sizing: border-box;
  }

  img {
      display: block;
      max-width: 100%;
  }
`

export default GlobalStyles
