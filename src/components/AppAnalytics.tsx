import React, {useContext, useEffect} from 'react'
import CookieConsentContext from './cookie-consent/CookieConsentContext'
import {useRouter} from 'next/router'
import {getFirebaseAnalytics} from '../firebase'
import {Analytics, logEvent} from 'firebase/analytics'
import Script from 'next/script'

const AppAnalytics = () => {
  const {agreedToAnalyticsCookies, agreedToMarketingCookies} =
    useContext(CookieConsentContext)
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

  if (agreedToMarketingCookies) {
    return (
      <>
        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                    var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe
              src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}"
              height="0" width="0"
              style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </>
    )
  } else {
    return null
  }
}

export default AppAnalytics
