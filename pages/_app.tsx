import React from 'react'
import * as Sentry from '@sentry/react'
import type {AppProps} from 'next/app'
import GlobalStyles from '../globalStyles'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from '../theme/theme'
import Footer from '../components/Footer'
import {QueryClientProvider} from 'react-query'
import queryClient from '../queryClient'
import {AuthContextProvider, useAuth} from '../AuthUserContext'
import {useRouter} from 'next/router'
import {useGetUser} from '../components/api/user'
import {QueryGuard} from '../QueryGuard'
import Loading from '../components/Loading'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'
import ErrorBoundaryFallBack from '../components/domain/ErrorBoundaryFallBack'
import '../theme/animations/TypingAnimation.css'

const OnboardingProtectionRoute = ({children}: {children: React.ReactNode}) => {
  const {user, isLoading} = useAuth()
  const useGetSocUser = useGetUser(!!user)
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (user) {
    return (
      <QueryGuard {...useGetSocUser}>
        {(socUser) => {
          if (socUser) {
            // socUser exists, we can return content
            return <>{children}</>
          } else {
            // socUser does not exist but user is logged in, it means he has to onboard
            router.replace({pathname: '/onboarding', query: {from: location.pathname}})
            return <></>
          }
        }}
      </QueryGuard>
    )
  }

  return <>{children}</>
}

const routesThatDontNeedOnBoardingProtection = ['/login', '/onboarding']

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()

  return (
    <Sentry.ErrorBoundary fallback={<ErrorBoundaryFallBack />}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <RootWrapper>
              <QueryClientProvider client={queryClient}>
                <GlobalStyles />
                {routesThatDontNeedOnBoardingProtection.includes(router.pathname) &&
                <>
                  <Component {...pageProps} />
                  <Footer />
                </>
                }
                {!routesThatDontNeedOnBoardingProtection.includes(router.pathname) &&
                <OnboardingProtectionRoute>
                  <Component {...pageProps} />
                  <Footer />
                </OnboardingProtectionRoute>
                }
              </QueryClientProvider>
            </RootWrapper>
          </AuthContextProvider>
        </ThemeProvider>
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
