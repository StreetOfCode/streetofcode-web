import {ThemeSetting} from './types'
import {isRunningOnServer} from './utils'

const THEME_SETTING_KEY = 'themeSetting'

const getThemeSetting = () =>
  !isRunningOnServer()
    ? (localStorage.getItem(THEME_SETTING_KEY) as ThemeSetting | null)
    : null

const setThemeSetting = (themeSetting: ThemeSetting) =>
  !isRunningOnServer() && localStorage.setItem(THEME_SETTING_KEY, themeSetting)

export const storage = {
  getThemeSetting,
  setThemeSetting,
}
