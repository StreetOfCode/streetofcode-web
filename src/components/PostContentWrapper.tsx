import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Flex from './core/Flex'

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const PostContentWrapper = ({className, children, ...props}: Props) => {
  return (
    <Wrapper className={className} {...props}>
      <FlexWrapper>{children}</FlexWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

const FlexWrapper = styled(Flex)`
  flex-direction: column;
  max-width: 750px;
  align-self: center;
`

export default PostContentWrapper
