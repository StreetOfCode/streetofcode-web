import React from 'react'

type CookieConsentContextValue = {
  agreedToCookies: boolean
  setAggreedToCookies: React.Dispatch<React.SetStateAction<boolean>>
}

const CookieConsentContext = React.createContext<CookieConsentContextValue>({
  agreedToCookies: false,
  setAggreedToCookies: () => {
    return
  },
})

export default CookieConsentContext
