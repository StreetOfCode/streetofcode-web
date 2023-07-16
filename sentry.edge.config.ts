// https://blog.sentry.io/support-for-next-js-middleware-and-edge-routes/#getting-started-with-edge-monitoring

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_SERVER,
  tracesSampleRate: 1.0,
})
