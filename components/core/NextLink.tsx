import Link from 'next/link'
import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {UrlObject} from 'url'
import {AlignItems} from './Flex'

type Props = {
  className?: string
  href: string | UrlObject
  alignSelf?: AlignItems
} & HTMLAttributes<HTMLElement>

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
