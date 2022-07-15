import React from 'react'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from '../theme/theme'
import Footer from '../components/Footer'
import {QueryClientProvider} from 'react-query'
import queryClient from '../queryClient'
import '../theme/animations/TypingAnimation.css'
import {AuthContextProvider} from '../AuthUserContext'


function MyApp({Component, pageProps}: AppProps) {

  // HYDRATE MOZNO PREC https://react-query-v3.tanstack.com/guides/ssr

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RootWrapper>
          <QueryClientProvider client={queryClient}>
            {/* <Hydrate state={pageProps.dehydratedState}> */}
            <GlobalStyles />
            <Component {...pageProps} />
            <Footer />
            {/* </Hydrate> */}
          </QueryClientProvider>
        </RootWrapper>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default MyApp
