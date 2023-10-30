import React from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

// A hack to get styled-components to work with SSR and to get rid
// of the FOUC (flash of unstyled content) on the initial page load.
// https://styled-components.com/docs/advanced#nextjs
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {/* Without this website with disabled javascript would have no colors*/}
            <style
              dangerouslySetInnerHTML={{
                __html: `html {
              --color-primary: white;
              --color-secondary: #212121;
              --color-accent: #7E50E6;
                }
            `,
              }}
            />
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  // Sets CSS theme color variables React is loaded. By default
  // SSR can only render page with either light or dark theme. This
  // ensures that the correct theme colors is set quickly after the page
  // is loaded (without waiting for React). Yes, there's some duplication
  // here but it's not worth the effort to avoid it (if it's even possible).
  render() {
    const codeToRunOnClient = `
      (function () {
        let themeSetting = 'AUTO'

        try {
          themeSetting =
            (typeof window !== 'undefined' &&
              window.localStorage.getItem('themeSetting')) ||
            'AUTO'
          // eslint-disable-next-line no-empty
        } catch (e) {}

        const theme = (function () {
          if (themeSetting === 'LIGHT') {
            return themeSetting
          } else if (themeSetting === 'DARK') {
            return themeSetting
          } else {
            const isLightTheme =
              typeof window !== 'undefined' &&
              window.matchMedia('(prefers-color-scheme: light)').matches
            return isLightTheme ? 'LIGHT' : 'DARK'
          }
        })()

        document.body.setAttribute('theme-type', theme)
        const root = document.documentElement

        if (theme === 'LIGHT') {
          root.style.setProperty('--initial-theme-type', theme)
          root.style.setProperty('--color-primary', 'white')
          root.style.setProperty('--color-secondary', '#212121')
          root.style.setProperty('--color-accent', '#7E50E6')
          root.style.setProperty('--color-grey', '#545454')
          root.style.setProperty('--color-danger', '#CB2041')
          root.style.setProperty('--color-success', '#4CBF6B')
          root.style.setProperty('--color-footer-background', '#212121')
          root.style.setProperty('--color-shadow', 'rgba(0,0,0,0.2)')
          root.style.setProperty('--color-course-info-icon', '#58595B')
        } else {
          root.style.setProperty('--initial-theme-type', theme)
          root.style.setProperty('--color-primary', '#212121')
          root.style.setProperty('--color-secondary', '#efefef')
          root.style.setProperty('--color-accent', '#7E50E6')
          root.style.setProperty('--color-grey', '#545454')
          root.style.setProperty('--color-danger', '#CB2041')
          root.style.setProperty('--color-success', '#4CBF6B')
          root.style.setProperty('--color-footer-background', '#efefef')
          root.style.setProperty('--color-shadow', 'rgba(255,255,255,0.2)')
          root.style.setProperty('--color-course-info-icon', '#BCBEC0')
        }
      })()
    `

    return (
      <Html>
        <Head>
          <script
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
          <link rel="stylesheet" href="https://use.typekit.net/vve8dub.css" />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe
              src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}"
              height="0" width="0"
              style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          <script dangerouslySetInnerHTML={{__html: codeToRunOnClient}} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
