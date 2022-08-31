import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  to: string
  text: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const BackLink = ({className, text, to, ...props}: Props) => {
  return (
    <StyledLink href={to} {...props} passHref>
      <StyledA className={className}>&larr; {text}</StyledA>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`

const StyledA = styled.a`
  display: block;
  text-align: left;
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.secondaryColor};
  margin-bottom: 32px;
`

export default BackLink
