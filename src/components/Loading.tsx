import styled from 'styled-components'
import React from 'react'
import Flex from './core/Flex'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => {
  return (
    <WrapperFlex direction="column" justifyContent="center">
      <CircularProgress />
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  align-self: center;
  flex: 1;

  .MuiCircularProgress-colorPrimary {
    color: ${(props) => props.theme.accentColor};
  }
`

export default Loading
