import styled from 'styled-components'
import React from 'react'
import Flex from './core/Flex'
import {CircularProgress} from '@mui/material'

const Loading = () => {
  return (
    <WrapperFlex direction="column" justifyContent="center">
      <CircularProgress />
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  flex: 1;
`

export default Loading
