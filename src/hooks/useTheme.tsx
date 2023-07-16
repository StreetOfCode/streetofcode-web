import {useContext, useEffect, useState} from 'react'
import {storage} from '../localStorage'
import {darkTheme, lightTheme, ThemeType} from '../theme/theme'
import ThemeSettingContext from '../theme/ThemeSettingContext'
import {ThemeSetting} from '../types'

export const THEME_SETTING_KEY = 'themeSetting'

const useThemeDetector = () => {
  const getCurrentTheme = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)')?.matches

  const [isLightTheme, setIsLightTheme] = useState(getCurrentTheme())

  const mqListener = (e: MediaQueryListEvent) => {
    setIsLightTheme(e.matches)
  }

  useEffect(() => {
    const lightThemeMq = window.matchMedia('(prefers-color-scheme: light)')
    lightThemeMq?.addEventListener('change', mqListener)
    return () => lightThemeMq?.removeEventListener('change', mqListener)
  }, [])

  return isLightTheme
}

const updateCSSThemeVariables = (theme: ThemeType) => {
  document.body.setAttribute('theme-type', theme.type)

  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primaryColor)
  root.style.setProperty('--color-secondary', theme.secondaryColor)
  root.style.setProperty('--color-accent', theme.accentColor)
  root.style.setProperty('--color-grey', theme.greyColor)
  root.style.setProperty('--color-danger', theme.dangerColor)
  root.style.setProperty('--color-success', theme.successColor)
  root.style.setProperty(
    '--color-footer-background',
    theme.footerBackgroundColor,
  )
  root.style.setProperty('--color-shadow', theme.shadowColor)
  root.style.setProperty('--color-course-info-icon', theme.courseInfoIconColor)
}

const determineTheme = (
  setting: ThemeSetting,
  isLightTheme: boolean,
): ThemeType => {
  if (setting === 'LIGHT') {
    return lightTheme
  } else if (setting === 'DARK') {
    return darkTheme
  } else {
    return isLightTheme ? lightTheme : darkTheme
  }
}

export const useTheme = () => {
  const {themeSetting, setThemeSetting} = useContext(ThemeSettingContext)
  const isLightTheme = useThemeDetector()

  useEffect(() => {
    storage.setThemeSetting(themeSetting)
    updateCSSThemeVariables(determineTheme(themeSetting, isLightTheme))
  }, [themeSetting])

  const theme = determineTheme(themeSetting, isLightTheme)

  return {
    theme,
    isLightTheme: theme === lightTheme,
    themeSetting,
    setThemeSetting,
  }
}
