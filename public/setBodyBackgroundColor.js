// Sets body background color before React is loaded. By default
// SSR can only render page with either light or dark theme. This
// ensures that the correct theme is set quickly after the page
// is loaded (without waiting for React). Yes, there's some duplication
// here but it's not worth the effort to avoid it (if it's even possible).
;(function () {
  let themeSetting = 'AUTO'

  try {
    themeSetting =
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('themeSetting')) ||
      'AUTO'
    // eslint-disable-next-line no-empty
  } catch (e) {}

  const lightBackgroundColor = 'white'
  const darkBackgroundColor = '#212121'

  const backgroundColor = (function () {
    if (themeSetting === 'LIGHT') {
      return lightBackgroundColor
    } else if (themeSetting === 'DARK') {
      return darkBackgroundColor
    } else {
      const isDarkTheme =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      return isDarkTheme ? darkBackgroundColor : lightBackgroundColor
    }
  })()

  document.body.style.backgroundColor = backgroundColor
})()
