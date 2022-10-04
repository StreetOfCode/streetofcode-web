import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Button from '../components/core/Button'
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineHdrAuto,
} from 'react-icons/md'
import {useTheme} from '../hooks/useTheme'
import {lightTheme, ThemeType} from './theme'
import {ThemeSetting} from '../types'

const useThemeConfig = (themeSetting: ThemeSetting, theme: ThemeType) => {
  return {
    LIGHT: {
      nextThemeSetting: 'DARK' as ThemeSetting,
      icon: <MdOutlineLightMode />,
    },
    DARK: {
      nextThemeSetting: 'AUTO' as ThemeSetting,
      icon: <MdOutlineDarkMode />,
    },
    AUTO: {
      nextThemeSetting: 'LIGHT' as ThemeSetting,
      icon: <MdOutlineHdrAuto />,
    },
    'NOT-SET': {
      nextThemeSetting: (theme === lightTheme
        ? 'DARK'
        : 'LIGHT') as ThemeSetting,
      icon:
        theme === lightTheme ? <MdOutlineLightMode /> : <MdOutlineDarkMode />,
    },
  }[themeSetting]
}

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const ThemeSwitcher = ({className, ...props}: Props) => {
  const {theme, themeSetting, setThemeSetting} = useTheme()

  const {nextThemeSetting, icon} = useThemeConfig(themeSetting, theme)

  const switchTheme = () => {
    setThemeSetting(nextThemeSetting)
  }

  return (
    <StyledWrapper className={className} {...props}>
      <StyledButton iconBefore={icon} onClick={switchTheme} />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``

const StyledButton = styled(Button)`
  padding: 8px;

  svg {
    width: 18px;
    height: 18px;
  }
`

export default ThemeSwitcher
