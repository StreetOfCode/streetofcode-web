import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {UrlObject} from 'url'
import {AlignItems} from './Flex'

type Props = {
  className?: string
  href: string | UrlObject
  alignSelf?: AlignItems
  styleIfActive?: boolean // used in NavBar
  blankTarget?: boolean
} & HTMLAttributes<HTMLElement>

const NextLink = ({
  className,
  href,
  alignSelf,
  styleIfActive,
  children,
  blankTarget,
  ...props
}: Props) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <StyledLink href={href} {...props} passHref>
      <StyledA
        className={className}
        alignSelf={alignSelf}
        active={styleIfActive && isActive}
        target={blankTarget ? '_blank' : undefined}
      >
        {children}
      </StyledA>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledA = styled.a<{alignSelf?: AlignItems; active?: boolean}>`
  text-decoration: none;
  color: unset;
  align-self: ${(props) => props.alignSelf};

  & > span {
    text-decoration: ${(props) => props.active && 'underline'};
  }

  & > span:hover {
    opacity: 0.7;
  }
`

export default NextLink
