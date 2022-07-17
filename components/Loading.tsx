import {CircularProgress} from '@mui/material'
import React from 'react'
import Flex from './core/Flex'

const Loading = () => {
  return (
    <Flex direction="column" justifyContent="center">
      <CircularProgress />
    </Flex>
  )
}

export default Loading
