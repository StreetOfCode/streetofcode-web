import React, {useState} from 'react'
import * as Sentry from '@sentry/nextjs'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import styled from 'styled-components'
import Footer from '../components/Footer'
import {QueryClientProvider} from 'react-query'
import queryClient from '../queryClient'
import {AuthContextProvider} from '../AuthUserContext'
import {useRouter} from 'next/router'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'
import ErrorBoundaryFallBack from '../components/domain/ErrorBoundaryFallBack'
import ThemeSettingContext from '../theme/ThemeSettingContext'
import OnboardingProtectionRoute from '../components/OnboardingProtectionRoute'
import SSRWrapper from '../components/SSRWrapper'
import {storage} from '../localStorage'
import NewsletterModal from '../components/NewsletterModal'
import NextNProgress from 'nextjs-progressbar'
import {routes} from '../routes'
import {lightTheme} from '../theme/theme'
import CookieConsent from '../components/cookie-consent/CookieConsent'
import CookieConsentContext from '../components/cookie-consent/CookieConsentContext'
import AppAnalytics from '../components/AppAnalytics'
import '../theme/animations/HeroAnimation.scss'
import 'pure-react-carousel/dist/react-carousel.es.css'

function MyApp({Component, pageProps}: AppProps) {
  const [agreedToCookies, setAgreedToCookies] = useState(false)
  const [themeSetting, setThemeSetting] = useState(
    storage.getThemeSetting() || 'NOT-SET',
  )
  const router = useRouter()

  if (router.pathname === routes.admin) {
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
          <CookieConsentContext.Provider
            value={{agreedToCookies, setAgreedToCookies}}
          >
            <AuthContextProvider>
              <RootWrapper>
                <QueryClientProvider client={queryClient}>
                  <GlobalStyles />
                  <NextNProgress color={lightTheme.accentColor} />
                  <SSRWrapper
                    ClientChildren={() => (
                      <OnboardingProtectionRoute>
                        <Component {...pageProps} />
                        <AppAnalytics />
                        <NewsletterModal />
                        <CookieConsent />
                        <Footer />
                      </OnboardingProtectionRoute>
                    )}
                    SSRChildren={() => (
                      <>
                        <Component {...pageProps} />
                        <Footer />
                      </>
                    )}
                  />
                </QueryClientProvider>
              </RootWrapper>
            </AuthContextProvider>
          </CookieConsentContext.Provider>
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
