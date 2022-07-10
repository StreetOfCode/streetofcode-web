import React from 'react'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import '../theme/animations/TypingAnimation.css'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from '../theme/theme'
import Footer from '../components/Footer'
import {AuthProvider} from '../auth'


function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RootWrapper>
          <GlobalStyles />
          <Component {...pageProps} />
          <Footer />
        </RootWrapper>
      </AuthProvider>
    </ThemeProvider>
  )
}

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`


export default MyApp
