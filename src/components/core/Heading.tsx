import React, {HTMLAttributes} from 'react'
import styled, {css} from 'styled-components'
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

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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
  const headingProps: Props = {
    className,
    variant,
    color: color || 'secondary',
    align: align || 'left',
    inline: inline || false,
    normalWeight,
    withAccentUnderline,
    noWrap,
    maxWidth,
  }

  if (variant === 'h1') {
    return (
      <H1Styled {...headingProps} {...props}>
        {children}
      </H1Styled>
    )
  } else if (variant === 'h2') {
    return (
      <H2Styled {...headingProps} {...props}>
        {children}
      </H2Styled>
    )
  } else if (variant === 'h3') {
    return (
      <H3Styled {...headingProps} {...props}>
        {children}
      </H3Styled>
    )
  } else if (variant === 'h4') {
    return (
      <H4Styled {...headingProps} {...props}>
        {children}
      </H4Styled>
    )
  } else if (variant === 'h5') {
    return (
      <H5Styled {...headingProps} {...props}>
        {children}
      </H5Styled>
    )
  } else {
    return (
      <H6Styled {...headingProps} {...props}>
        {children}
      </H6Styled>
    )
  }
}

const styleValuesBasedOnDevice = {
  XL: {
    h1: {fontSize: '82px', lineHeight: '1.0'},
    h2: {fontSize: '62px', lineHeight: '1.1'},
    h3: {fontSize: '48px', lineHeight: '1.2'},
    h4: {fontSize: '32px', lineHeight: '1.3'},
    h5: {fontSize: '24px', lineHeight: '1.4'},
    h6: {fontSize: '22px', lineHeight: '1.4'},
  },
  L: {
    h1: {fontSize: '72px', lineHeight: '1.0'},
    h2: {fontSize: '52px', lineHeight: '1.1'},
    h3: {fontSize: '42px', lineHeight: '1.2'},
    h4: {fontSize: '30px', lineHeight: '1.3'},
    h5: {fontSize: '22px', lineHeight: '1.4'},
    h6: {fontSize: '18px', lineHeight: '1.4'},
  },
  M: {
    h1: {fontSize: '62px', lineHeight: '1.0'},
    h2: {fontSize: '42px', lineHeight: '1.1'},
    h3: {fontSize: '36px', lineHeight: '1.2'},
    h4: {fontSize: '28px', lineHeight: '1.3'},
    h5: {fontSize: '22px', lineHeight: '1.4'},
    h6: {fontSize: '18px', lineHeight: '1.4'},
  },
  S: {
    h1: {fontSize: '48px', lineHeight: '1.0'},
    h2: {fontSize: '42px', lineHeight: '1.1'},
    h3: {fontSize: '32px', lineHeight: '1.2'},
    h4: {fontSize: '22px', lineHeight: '1.3'},
    h5: {fontSize: '20px', lineHeight: '1.4'},
    h6: {fontSize: '16px', lineHeight: '1.4'},
  },
  XS: {
    h1: {fontSize: '38px', lineHeight: '1.0'},
    h2: {fontSize: '36px', lineHeight: '1.1'},
    h3: {fontSize: '32px', lineHeight: '1.2'},
    h4: {fontSize: '22px', lineHeight: '1.3'},
    h5: {fontSize: '20px', lineHeight: '1.4'},
    h6: {fontSize: '16px', lineHeight: '1.4'},
  },
}

const headingStyle = css<{
  variant: Variant
  color?: Color
  align?: Align
  inline?: boolean
  normalWeight?: boolean
  withAccentUnderline?: boolean
  noWrap?: boolean
  maxWidth?: string
}>`
  display: ${(props) => (props.inline ? 'inline' : 'block')};

  color: ${(props) => `var(--color-${props.color})`};

  font-weight: ${(props) => (props.normalWeight ? 'normal' : 'bold')};
  text-align: ${(props) => props.align};
  border-bottom: ${(props) =>
    props.withAccentUnderline ? `4px solid var(--color-accent)` : 'unset'};
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'unset')};
  max-width: ${(props) => props.maxWidth && props.maxWidth};

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

const H1Styled = styled.h1`
  ${headingStyle}
`

const H2Styled = styled.h2`
  ${headingStyle}
`

const H3Styled = styled.h3`
  ${headingStyle}
`

const H4Styled = styled.h4`
  ${headingStyle}
`

const H5Styled = styled.h5`
  ${headingStyle}
`

const H6Styled = styled.h6`
  ${headingStyle}
`
export default Heading
