import React, {ButtonHTMLAttributes, useContext} from 'react'
import styled from 'styled-components'
import {ThemeType} from '../../theme/theme'
import ThemeSwitchingContext from '../../theme/ThemeSwitchingContext'
import Flex from './Flex'

type Props = {
  className?: string
  variant?: Variant
  uppercase?: boolean
  bold?: boolean
  disabled?: boolean
  size?: Size
  iconBefore?: React.ReactNode
  noWrap?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type Variant = 'accent' | 'default' | 'outline' | 'danger'
type Size = 'small' | 'default' | 'large' | 'very-large'

const variantStyleValues = (theme: ThemeType) => ({
  accent: {
    color: 'white', // this is by design so it doesn't change when themes switch
    backgroundColor: theme.accentColor,
    border: `2px solid ${theme.accentColor}`,
  },
  default: {
    color: theme.secondaryColor,
    backgroundColor: theme.primaryColor,
    border: `2px solid ${theme.secondaryColor}`,
  },
  outline: {
    color: theme.secondaryColor,
    backgroundColor: theme.primaryColor,
    border: `2px solid ${theme.accentColor}`,
  },
  danger: {
    color: theme.primaryColor,
    backgroundColor: theme.dangerColor,
    border: `2px solid ${theme.dangerColor}`,
  },
})

const sizeStyleValues = {
  small: {
    fontSize: '12px',
  },
  default: {
    fontSize: '16px',
  },
  large: {
    fontSize: '20px',
  },
  'very-large': {
    fontSize: '24px',
  },
}

const Button = ({
  children,
  className,
  variant,
  uppercase,
  bold,
  disabled,
  size,
  iconBefore,
  noWrap,
  ...props
}: Props) => {
  const {theme} = useContext(ThemeSwitchingContext)

  return (
    <StyledButton
      className={className}
      theme={theme}
      variant={variant || 'default'}
      uppercase={uppercase}
      bold={bold}
      disabled={disabled}
      size={size || 'default'}
      noWrap={noWrap}
      {...props}
    >
      <Flex gap="12px" justifyContent="center">
        {iconBefore}
        {children}
      </Flex>
    </StyledButton>
  )
}

const StyledButton = styled.button<{
  theme: ThemeType
  variant: Variant
  uppercase?: boolean
  bold?: boolean
  disabled?: boolean
  size: Size
  noWrap?: boolean
}>`
  background-color: ${(props) =>
    variantStyleValues(props.theme)[props.variant].backgroundColor};
  color: ${(props) => variantStyleValues(props.theme)[props.variant].color};
  border: ${(props) => variantStyleValues(props.theme)[props.variant].border};
  padding: 0.5em 1.25em;
  border-radius: 10px;
  font-size: ${(props) => sizeStyleValues[props.size].fontSize};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  opacity: ${(props) => props.disabled && 0.7};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'unset')};
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'unset')};

  &:hover {
    cursor: ${(props) => !props.disabled && 'pointer'};
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export default Button
