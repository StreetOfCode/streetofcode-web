import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {device} from '../theme/device'

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const PageContentWrapper = ({className, children, ...props}: Props) => {
  return (
    <Wrapper className={className} {...props}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  align-self: center;
  padding: 50px 32px 100px 32px;
  width: clamp(320px, 100%, 1200px);

  @media ${device.L} {
    max-width: 900px;
  }
`

export default PageContentWrapper
