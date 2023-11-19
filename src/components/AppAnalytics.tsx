import {useContext, useEffect} from 'react'
import CookieConsentContext from './cookie-consent/CookieConsentContext'
import {useRouter} from 'next/router'
import {getFirebaseAnalytics} from '../firebase'
import {Analytics, logEvent} from 'firebase/analytics'

const AppAnalytics = () => {
  const {agreedToAnalyticsCookies} = useContext(CookieConsentContext)
  const router = useRouter()

  useEffect(() => {
    const analytics = getFirebaseAnalytics(agreedToAnalyticsCookies)

    if (analytics == null) {
      return () => {
        return
      }
    } else {
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
    }
  }, [router.events, agreedToAnalyticsCookies])

  return null
}

export default AppAnalytics
