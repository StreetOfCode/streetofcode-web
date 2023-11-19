import React from 'react'

type CookieConsentContextValue = {
  agreedToAnalyticsCookies: boolean
  setAgreedToAnalyticsCookies: React.Dispatch<React.SetStateAction<boolean>>
}

const CookieConsentContext = React.createContext<CookieConsentContextValue>({
  agreedToAnalyticsCookies: false,
  setAgreedToAnalyticsCookies: () => {
    return
  },
})

export default CookieConsentContext
