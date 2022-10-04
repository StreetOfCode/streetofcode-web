import React from 'react'
import {storage} from '../localStorage'
import {ThemeSetting} from '../types'

type ThemeSettingContextValue = {
  themeSetting: ThemeSetting
  setThemeSetting: React.Dispatch<React.SetStateAction<ThemeSetting>>
}

// This cannot be named just ThemeContext because it would conflict with styled-components ThemeContext
const ThemeSettingContext = React.createContext<ThemeSettingContextValue>({
  themeSetting: storage.getThemeSetting() || 'AUTO',
  setThemeSetting: () => {
    return
  },
})

export default ThemeSettingContext
