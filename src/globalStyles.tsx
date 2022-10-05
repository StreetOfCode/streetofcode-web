import {createGlobalStyle} from 'styled-components'
import {ThemeType} from './theme/theme'

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    font-family: soleil, sans-serif;
    font-style: normal;

    margin: 0;
    padding: 0;

    // !important has to be used so that the background-color set in
    // _document.tsx is overridden by the current theme color.
    background-color: ${({theme}: {theme: ThemeType}) =>
      theme.primaryColor} !important;
  }


  * {
    box-sizing: border-box;
  }

  img {
      display: block;
      max-width: 100%;
  }

  li {
    color: ${(props) => props.theme.secondaryColor};
  }

  a {
    color: ${(props) => props.theme.accentColor};
  }

  .grecaptcha-badge {
    visibility: hidden;
  }
`

export default GlobalStyles
