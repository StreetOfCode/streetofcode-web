import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {device} from '../../theme/device'

type Props = {
  className?: string
  inline?: boolean
  variant: Variant
  color?: Color
  align?: Align
  normalWeight?: boolean
  withAccentUnderline?: boolean
  noWrap?: boolean
  maxWidth?: string
} & HTMLAttributes<HTMLElement>

type Variant = 'title' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type Color = 'primary' | 'secondary' | 'accent'
type Align = 'left' | 'center' | 'right'

const Heading = ({
  children,
  className,
  variant,
  color,
  align,
  inline,
  normalWeight,
  withAccentUnderline,
  noWrap,
  maxWidth,
  ...props
}: Props) => {
  return (
    <StyledHeading
      className={className}
      variant={variant}
      color={color || 'secondary'}
      align={align || 'left'}
      inline={inline || false}
      normalWeight={normalWeight}
      withAccentUnderline={withAccentUnderline}
      noWrap={noWrap}
      maxWidth={maxWidth}
      {...props}
    >
      {children}
    </StyledHeading>
  )
}

const styleValuesBasedOnDevice = {
  XL: {
    title: {fontSize: '82px', lineHeight: '1.0'},
    h1: {fontSize: '62px', lineHeight: '1.1'},
    h2: {fontSize: '48px', lineHeight: '1.2'},
    h3: {fontSize: '32px', lineHeight: '1.3'},
    h4: {fontSize: '24px', lineHeight: '1.4'},
    h5: {fontSize: '22px', lineHeight: '1.4'},
  },
  L: {
    title: {fontSize: '72px', lineHeight: '1.0'},
    h1: {fontSize: '52px', lineHeight: '1.1'},
    h2: {fontSize: '42px', lineHeight: '1.2'},
    h3: {fontSize: '30px', lineHeight: '1.3'},
    h4: {fontSize: '22px', lineHeight: '1.4'},
    h5: {fontSize: '18px', lineHeight: '1.4'},
  },
  M: {
    title: {fontSize: '62px', lineHeight: '1.0'},
    h1: {fontSize: '42px', lineHeight: '1.1'},
    h2: {fontSize: '36px', lineHeight: '1.2'},
    h3: {fontSize: '28px', lineHeight: '1.3'},
    h4: {fontSize: '22px', lineHeight: '1.4'},
    h5: {fontSize: '18px', lineHeight: '1.4'},
  },
  S: {
    title: {fontSize: '48px', lineHeight: '1.0'},
    h1: {fontSize: '42px', lineHeight: '1.1'},
    h2: {fontSize: '32px', lineHeight: '1.2'},
    h3: {fontSize: '22px', lineHeight: '1.3'},
    h4: {fontSize: '20px', lineHeight: '1.4'},
    h5: {fontSize: '16px', lineHeight: '1.4'},
  },
  XS: {
    title: {fontSize: '38px', lineHeight: '1.0'},
    h1: {fontSize: '36px', lineHeight: '1.1'},
    h2: {fontSize: '32px', lineHeight: '1.2'},
    h3: {fontSize: '22px', lineHeight: '1.3'},
    h4: {fontSize: '20px', lineHeight: '1.4'},
    h5: {fontSize: '16px', lineHeight: '1.4'},
  },
}

const StyledHeading = styled.span<{
  variant: Variant
  color: Color
  align: Align
  inline: boolean
  normalWeight?: boolean
  withAccentUnderline?: boolean
  noWrap?: boolean
  maxWidth?: string
}>`
  display: ${(props) => (props.inline ? 'inline' : 'block')};

  color: ${(props) => {
    if (props.color === 'primary') {
      return props.theme.primaryColor
    } else if (props.color === 'secondary') {
      return props.theme.secondaryColor
    } else {
      return props.theme.accentColor
    }
  }};

  font-weight: ${(props) => (props.normalWeight ? 'normal' : 'bold')};
  text-align: ${(props) => props.align};
  border-bottom: ${(props) =>
    props.withAccentUnderline
      ? `4px solid ${props.theme.accentColor}`
      : 'unset'};
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'unset')};

  @media ${device.XL} {
    font-size: ${(props) =>
      styleValuesBasedOnDevice['XL'][props.variant].fontSize};
    line-height: ${(props) =>
      styleValuesBasedOnDevice['XL'][props.variant].lineHeight};
  }

  @media ${device.L} {
    font-size: ${(props) =>
      styleValuesBasedOnDevice['L'][props.variant].fontSize};
    line-height: ${(props) =>
      styleValuesBasedOnDevice['L'][props.variant].lineHeight};
  }

  @media ${device.M} {
    font-size: ${(props) =>
      styleValuesBasedOnDevice['M'][props.variant].fontSize};
    line-height: ${(props) =>
      styleValuesBasedOnDevice['M'][props.variant].lineHeight};
  }

  @media ${device.S} {
    font-size: ${(props) =>
      styleValuesBasedOnDevice['S'][props.variant].fontSize};
    line-height: ${(props) =>
      styleValuesBasedOnDevice['S'][props.variant].lineHeight};
  }

  @media ${device.XS} {
    font-size: ${(props) =>
      styleValuesBasedOnDevice['XS'][props.variant].fontSize};
    line-height: ${(props) =>
      styleValuesBasedOnDevice['XS'][props.variant].lineHeight};
  }
`

export default Heading
