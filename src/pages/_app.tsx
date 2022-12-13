import {Analytics, logEvent} from 'firebase/analytics'
import React, {HTMLAttributes, useEffect, useState} from 'react'
import * as Sentry from '@sentry/react'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import styled, {ThemeProvider} from 'styled-components'
import Footer from '../components/Footer'
import {QueryClientProvider} from 'react-query'
import queryClient from '../queryClient'
import {AuthContextProvider} from '../AuthUserContext'
import {useRouter} from 'next/router'
import {analytics} from '../firebase'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'
import ErrorBoundaryFallBack from '../components/domain/ErrorBoundaryFallBack'
import ThemeSettingContext from '../theme/ThemeSettingContext'
import OnboardingProtectionRoute from '../components/OnboardingProtectionRoute'
import SSRWrapper from '../components/SSRWrapper'
import {useTheme} from '../hooks/useTheme'
import {storage} from '../localStorage'
import Loading from '../components/Loading'
import NewsletterModal from '../components/NewsletterModal'
import '../theme/animations/HeroAnimation.css'
import 'pure-react-carousel/dist/react-carousel.es.css'

const _ThemeProvider = ({children}: HTMLAttributes<HTMLElement>) => {
  const {theme} = useTheme()
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

function MyApp({Component, pageProps}: AppProps) {
  const [themeSetting, setThemeSetting] = useState(
    storage.getThemeSetting() || 'NOT-SET',
  )
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
        <ThemeSettingContext.Provider value={{themeSetting, setThemeSetting}}>
          <_ThemeProvider>
            <AuthContextProvider>
              <RootWrapper>
                <QueryClientProvider client={queryClient}>
                  <GlobalStyles />
                  <SSRWrapper
                    ClientChildren={() => (
                      <OnboardingProtectionRoute>
                        <Component {...pageProps} />
                        <NewsletterModal />
                        <Footer />
                      </OnboardingProtectionRoute>
                    )}
                    SSRChildren={() => (
                      <>
                        <div style={{display: 'none'}}>
                          <Component {...pageProps} />
                          <Footer />
                        </div>
                        <Loading />
                      </>
                    )}
                  />
                </QueryClientProvider>
              </RootWrapper>
            </AuthContextProvider>
          </_ThemeProvider>
        </ThemeSettingContext.Provider>
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
