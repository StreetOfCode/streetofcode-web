import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  alignSelf?: AlignItems
  gap?: string,
  flex?: string,
  direction?: Direction
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  alignContent?: AlignContent
} & HTMLAttributes<HTMLDivElement>

type Direction = 'row' | 'column'
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center'
type AlignContent = 'normal' | 'center' | 'space-between' | 'space-around'

const Flex = ({
  children,
  className,
  alignSelf,
  gap,
  flex,
  direction,
  justifyContent,
  alignContent,
  alignItems,
  ...props
}: Props) => {
  return (
    <StyledFlex
      className={className}
      direction={direction || 'row'}
      justifyContent={justifyContent || 'flex-start'}
      alignItems={alignItems || 'center'}
      alignContent={alignContent || 'normal'}
      alignSelf={alignSelf || 'center'}
      gap={gap}
      flex={flex}
      {...props}
    >
      {children}
    </StyledFlex>
  )
}

const StyledFlex = styled.div<{
  alignSelf?: AlignItems
  direction: Direction
  justifyContent: JustifyContent
  alignItems: AlignItems
  alignContent: AlignContent
  gap?: string
  flex?: string
}>`
  align-self: ${(props) => props.alignSelf};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  gap: ${(props) => props.gap};
  flex: ${(props) => props.flex};
`

export default Flex
