import React, {useEffect, useState} from 'react'
import {CookieConsent} from '../../types'
import {getCookie, hasCookie, setCookie} from 'cookies-next'
import {COOKIE_CONSENT, ONE_YEAR} from '../../constants'

type CookieConsentContextValue = {
  cookieConsent: CookieConsent | undefined
  setCookieConsent: (cookieConsent: CookieConsent | undefined) => void
}

export const CookieConsentContext =
  React.createContext<CookieConsentContextValue>({
    cookieConsent: {
      agreedToAnalyticsCookies: false,
      agreedToMarketingCookies: false,
    },
    setCookieConsent: () => {
      return
    },
  })

export const CookieConsentContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cookieConsent, setCookieConsent] = useState<
    CookieConsent | undefined
  >()

  useEffect(() => {
    if (hasCookie(COOKIE_CONSENT)) {
      const consentCookie = getCookie(COOKIE_CONSENT)
      const consentCookieString = consentCookie?.toString()
      if (consentCookieString) {
        const consent = JSON.parse(consentCookieString) as CookieConsent
        setCookieConsent(consent)
      }
    }
  }, [])

  const _setCookieConsent = (cookieConsent: CookieConsent | undefined) => {
    setCookie(COOKIE_CONSENT, JSON.stringify(cookieConsent), {maxAge: ONE_YEAR})
    setCookieConsent(cookieConsent)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        cookieConsent,
        setCookieConsent: _setCookieConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}
