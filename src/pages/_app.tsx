import {Analytics, logEvent} from 'firebase/analytics'
import React, {useEffect, useState} from 'react'
import * as Sentry from '@sentry/react'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme} from '../theme/theme'
import Footer from '../components/Footer'
import {QueryClientProvider} from 'react-query'
import queryClient from '../queryClient'
import {AuthContextProvider} from '../AuthUserContext'
import {useRouter} from 'next/router'
import {analytics} from '../firebase'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'
import ErrorBoundaryFallBack from '../components/domain/ErrorBoundaryFallBack'
import ThemeSwitchingContext from '../theme/ThemeSwitchingContext'
import '../theme/animations/TypingAnimation.css'
import OnboardingProtectionRoute from '../components/OnboardingProtectionRoute'

function MyApp({Component, pageProps}: AppProps) {
  const [theme, setTheme] = useState(lightTheme)
  const router = useRouter()

  useEffect(() => {
    if (analytics == null) {
      return () => {
        return
      }
    }

    const _logEvent = (url: string) => {
      logEvent(analytics as Analytics, 'screen_view' as string, {
        firebase_screen: url,
      })
    }

    router.events.on('routeChangeComplete', _logEvent)

    _logEvent(window.location.pathname)

    return () => {
      router.events.off('routeChangeComplete', _logEvent)
    }
  }, [router.events, analytics])

  if (router.pathname === '/admin') {
    return (
      <AuthContextProvider>
        <RootWrapper>
          <Component {...pageProps} />
        </RootWrapper>
      </AuthContextProvider>
    )
  }

  return (
    <Sentry.ErrorBoundary fallback={<ErrorBoundaryFallBack />}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}
      >
        <ThemeSwitchingContext.Provider value={{theme, setTheme}}>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <RootWrapper>
                <QueryClientProvider client={queryClient}>
                  <GlobalStyles />
                  <OnboardingProtectionRoute>
                    <Component {...pageProps} />
                    <Footer />
                  </OnboardingProtectionRoute>
                </QueryClientProvider>
              </RootWrapper>
            </AuthContextProvider>
          </ThemeProvider>
        </ThemeSwitchingContext.Provider>
      </GoogleReCaptchaProvider>
    </Sentry.ErrorBoundary>
  )
}

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default MyApp
