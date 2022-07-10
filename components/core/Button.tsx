import React, {ButtonHTMLAttributes} from 'react'
import styled from 'styled-components'
import {theme} from '../../theme/theme'
import Flex from './Flex'

type Props = {
  className?: string
  variant?: Variant
  withoutUppercase?: boolean
  normalWeight?: boolean
  disabled?: boolean
  size?: Size
  iconBefore?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

type Variant = 'accent' | 'default' | 'outline'
type Size = 'small' | 'default' | 'large' | 'very-large'

const variantStyleValues = {
  accent: {
    color: theme.primaryColor,
    backgroundColor: theme.accentColor,
    border: 'none',
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
  withoutUppercase,
  normalWeight,
  disabled,
  size,
  iconBefore,
  ...props}
: Props) => {
  return (
    <StyledButton
      className={className}
      variant={variant || 'default'}
      withoutUppercase={withoutUppercase}
      normalWeight={normalWeight}
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
  withoutUppercase?: boolean,
  normalWeight?: boolean,
  disabled?: boolean,
  size: Size
}>`
  background-color: ${(props) => variantStyleValues[props.variant].backgroundColor};
  color: ${(props) => variantStyleValues[props.variant].color};
  border: ${(props) => variantStyleValues[props.variant].border};
  padding: .75em 1.25em;
  border-radius: 10px;
  font-size: ${(props) => sizeStyleValues[props.size].fontSize};
  font-weight: ${(props) => props.normalWeight ? 'normal' : 'bold'};
  opacity: ${(props) => props.disabled && 0.7};

  text-transform: ${(props) => props.withoutUppercase ? 'unset' : 'uppercase'};

  &:hover {
    cursor: ${(props) => !props.disabled && 'pointer'};
  }
`

export default Button
