import React, {HTMLAttributes, useContext} from 'react'
import styled from 'styled-components'
import Button from '../components/core/Button'
import {MdOutlineLightMode, MdOutlineDarkMode} from 'react-icons/md'
import {darkTheme, lightTheme} from './theme'
import ThemeSwitchingContext from './ThemeSwitchingContext'


type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const ThemeSwitcher = ({className, ...props}: Props) => {
  const {theme, setTheme} = useContext(ThemeSwitchingContext)

  const switchTheme = () => {
    if (lightTheme === theme) {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }
  }

  return (<StyledWrapper className={className} {...props}>
    <StyledButton
      iconBefore={theme === lightTheme ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      onClick={switchTheme}
    />
  </StyledWrapper>)
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
