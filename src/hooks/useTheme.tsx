import {useContext, useEffect, useState} from 'react'
import {storage} from '../localStorage'
import {darkTheme, lightTheme} from '../theme/theme'
import ThemeSettingContext from '../theme/ThemeSettingContext'

export const THEME_SETTING_KEY = 'themeSetting'

export type ThemeSetting = 'LIGHT' | 'DARK' | 'AUTO'

const useThemeDetector = () => {
  const getCurrentTheme = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)')?.matches

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())

  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches)
  }

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq?.addEventListener('change', mqListener)
    return () => darkThemeMq?.removeEventListener('change', mqListener)
  }, [])

  return isDarkTheme
}

export const useTheme = () => {
  const {themeSetting, setThemeSetting} = useContext(ThemeSettingContext)

  useEffect(() => {
    storage.setThemeSetting(themeSetting)
  }, [themeSetting])

  const isDarkTheme = useThemeDetector()

  const theme = (function () {
    if (themeSetting === 'LIGHT') {
      return lightTheme
    } else if (themeSetting === 'DARK') {
      return darkTheme
    } else {
      return isDarkTheme ? darkTheme : lightTheme
    }
  })()

  return {theme, themeSetting, setThemeSetting}
}
