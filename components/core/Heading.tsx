import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'

type Props  = {
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
  title: {
    fontSize: '112px',
    lineHeight: '1.0',
  },
  h1: {
    fontSize: '86px',
    lineHeight: '1.1',
  },
  h2: {
    fontSize: '48px',
    lineHeight: '1.2',
  },
  h3: {
    fontSize: '32px',
    lineHeight: '1.3',
  },
  h4: {
    fontSize: '24px',
    lineHeight: '1.4',
  },
  h5: {
    fontSize: '22px',
    lineHeight: '1.4',
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

  font-size: ${(props) => styleValues[props.variant].fontSize};
  line-height: ${(props) => styleValues[props.variant].lineHeight} ;
  font-weight: ${(props) => props.normalWeight ? 'normal' : 'bold'};
  text-align: ${(props) => props.align};
  border-bottom: ${(props) => props.withAccentUnderline ? `4px solid ${props.theme.accentColor}` : 'unset'};
  white-space: ${(props) => props.noWrap ? 'nowrap' : 'unset'};
`

export default Heading
