import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {device} from '../../../theme/device'

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

  @media ${device.L} {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media ${device.M} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default GridWrapper
