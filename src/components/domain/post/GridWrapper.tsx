import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const GridWrapper = ({className, children}: Props) => {
  return <Wrapper className={className}>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 769px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default GridWrapper
