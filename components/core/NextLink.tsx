import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {AlignItems} from './Flex'

type Props = {
  className?: string
  href: string
  alignSelf?: AlignItems
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const NextLink = ({className, href, alignSelf, children, ...props}: Props) => {
  return (
    <StyledLink className={className} href={href} {...props} passHref>
      <StyledA alignSelf={alignSelf}>
        {children}
      </StyledA>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledA = styled.a<{alignSelf?: AlignItems}>`
  text-decoration: none;
  color: unset;
  align-self: ${(props) => props.alignSelf};
`

export default NextLink
