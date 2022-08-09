import React, {ButtonHTMLAttributes} from 'react'
import styled from 'styled-components'
import {theme} from '../../theme/theme'
import Flex from './Flex'

type Props = {
  className?: string
  variant?: Variant
  uppercase?: boolean
  bold?: boolean
  disabled?: boolean
  size?: Size
  iconBefore?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

type Variant = 'accent' | 'default' | 'outline' | 'danger'
type Size = 'small' | 'default' | 'large' | 'very-large'

const variantStyleValues = {
  accent: {
    color: theme.primaryColor,
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
}

const sizeStyleValues = {
  'small': {
    fontSize: '12px',
  },
  'default': {
    fontSize: '16px',
  },
  'large': {
    fontSize: '20px',
  },
  'very-large' : {
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
  ...props}
: Props) => {
  return (
    <StyledButton
      className={className}
      variant={variant || 'default'}
      uppercase={uppercase}
      bold={bold}
      disabled={disabled}
      size={size || 'default'}
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
  variant: Variant,
  uppercase?: boolean,
  bold?: boolean,
  disabled?: boolean,
  size: Size
}>`
  background-color: ${(props) => variantStyleValues[props.variant].backgroundColor};
  color: ${(props) => variantStyleValues[props.variant].color};
  border: ${(props) => variantStyleValues[props.variant].border};
  padding: .5em 1.25em;
  border-radius: 10px;
  font-size: ${(props) => sizeStyleValues[props.size].fontSize};
  font-weight: ${(props) => props.bold ? 'bold' : 'normal'};
  opacity: ${(props) => props.disabled && 0.7};

  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'unset'};

  &:hover {
    cursor: ${(props) => !props.disabled && 'pointer'};
  }
`

export default Button
