import React from 'react'
import {lightTheme, ThemeType} from './theme'

type ThemeSwitchingContextValue = {
  theme: ThemeType,
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
}

// This cannot be named just ThemeContext because it would conflict with styled-components ThemeContext
const ThemeSwitchingContext = React.createContext<ThemeSwitchingContextValue>({
  theme: lightTheme,
  setTheme: () => {return},
})
export default ThemeSwitchingContext
