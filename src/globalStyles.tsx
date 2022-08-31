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

    background-color: ${({theme}: {theme: ThemeType}) => theme.primaryColor};
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
`

export default GlobalStyles
