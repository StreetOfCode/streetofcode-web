import React from 'react'

type CookieConsentContextValue = {
  agreedToCookies: boolean
  setAgreedToCookies: React.Dispatch<React.SetStateAction<boolean>>
}

const CookieConsentContext = React.createContext<CookieConsentContextValue>({
  agreedToCookies: false,
  setAgreedToCookies: () => {
    return
  },
})

export default CookieConsentContext
