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
      {...props}
    >{children}
    </StyledHeading>
  )
}

const styleValues = {
  default: {
    title: {fontSize: '112px', lineHeight: '1.0'},
    h1: {fontSize: '72px', lineHeight: '1.1'},
    h2: {fontSize: '48px', lineHeight: '1.2'},
    h3: {fontSize: '32px', lineHeight: '1.3'},
    h4: {fontSize: '24px', lineHeight: '1.4'},
    h5: {fontSize: '22px', lineHeight: '1.4'},
  },
  tablet: {
    title: {fontSize: '86px', lineHeight: '1.0'},
    h1: {fontSize: '60px', lineHeight: '1.1'},
    h2: {fontSize: '36px', lineHeight: '1.2'},
    h3: {fontSize: '28px', lineHeight: '1.3'},
    h4: {fontSize: '22px', lineHeight: '1.4'},
    h5: {fontSize: '18px', lineHeight: '1.4'},
  },
  mobile: {
    title: {fontSize: '52px', lineHeight: '1.0'},
    h1: {fontSize: '42px', lineHeight: '1.1'},
    h2: {fontSize: '32px', lineHeight: '1.2'},
    h3: {fontSize: '22px', lineHeight: '1.3'},
    h4: {fontSize: '20px', lineHeight: '1.4'},
    h5: {fontSize: '16px', lineHeight: '1.4'},
  },
}

const StyledHeading = styled.span<{
  variant: Variant,
  color: Color,
  align: Align,
  inline: boolean
  normalWeight?: boolean
  withAccentUnderline?: boolean
  noWrap?: boolean
}>`
  display: ${(props) => props.inline ? 'inline' : 'block'};

  color: ${(props) => {
    if (props.color === 'primary') {
      return props.theme.primaryColor
    } else if (props.color === 'secondary') {
      return props.theme.secondaryColor
    } else {
      return props.theme.accentColor
    }
  }};

  font-weight: ${(props) => props.normalWeight ? 'normal' : 'bold'};
  text-align: ${(props) => props.align};
  border-bottom: ${(props) => props.withAccentUnderline ? `4px solid ${props.theme.accentColor}` : 'unset'};
  white-space: ${(props) => props.noWrap ? 'nowrap' : 'unset'};

  font-size: ${(props) => styleValues['default'][props.variant].fontSize};
  line-height: ${(props) => styleValues['default'][props.variant].lineHeight} ;

  @media ${device.tablet} {
    font-size: ${(props) => styleValues['tablet'][props.variant].fontSize};
    line-height: ${(props) => styleValues['tablet'][props.variant].lineHeight} ;
  }

  @media ${device.mobile} {
    font-size: ${(props) => styleValues['mobile'][props.variant].fontSize};
    line-height: ${(props) => styleValues['mobile'][props.variant].lineHeight} ;
  }
`

export default Heading
