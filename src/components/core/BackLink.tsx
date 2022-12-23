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
    <Link href={to} {...props} passHref>
      <StyledA className={className}>&larr; {text}</StyledA>
    </Link>
  )
}

const StyledA = styled.a`
  display: block;
  text-align: left;
  font-size: 14px;
  text-decoration: none;
  color: var(--color-secondary);
  margin-bottom: 32px;

  &:hover {
    text-decoration: underline;
  }
`

export default BackLink
