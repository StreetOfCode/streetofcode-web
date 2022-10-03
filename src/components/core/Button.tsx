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
  disableHoverTransform?: boolean
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
  disableHoverTransform = false,
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
      disableHoverTransform={disableHoverTransform}
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
  disableHoverTransform?: boolean
}>`
  background-color: ${(props) =>
    variantStyleValues(props.theme)[props.variant].backgroundColor};
  color: ${(props) => variantStyleValues(props.theme)[props.variant].color};
  border: ${(props) => variantStyleValues(props.theme)[props.variant].border};
  padding: 0.5em 1.25em;
  border-radius: 10px;
  font-size: ${(props) => sizeStyleValues[props.size].fontSize};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  opacity: ${(props) => props.disabled && 0.5};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'unset')};
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'unset')};

  transition: ${(props) =>
    !props.disabled &&
    !props.disableHoverTransform &&
    'transform 0.2s ease-in-out'};

  &:hover {
    cursor: ${(props) => !props.disabled && 'pointer'};
    transform: ${(props) =>
      !props.disabled && !props.disableHoverTransform && 'scale(1.05)'};
    transition: ${(props) =>
      !props.disabled &&
      !props.disableHoverTransform &&
      'transform 0.2s ease-in-out'};
    opacity: ${(props) => !props.disabled && '0.9'};
    box-shadow: ${(props) =>
      !props.disabled && `0 0 10px 0 ${props.theme.shadowColor}`};
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export default Button
