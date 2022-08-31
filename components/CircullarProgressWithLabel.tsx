import * as React from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Text from '../components/core/Text'
import styled from 'styled-components'

type Props = {
  value: number
  // width and height (i.e: 50px)
  size?: string
  withoutTextInMiddle?: boolean
  accentColor?: boolean
} & CircularProgressProps

const CircullarProgressWithLabel = ({
  value,
  size,
  withoutTextInMiddle,
  accentColor,
  ...props
}: Props) => {
  return (
    <BoxWrapper
      sx={{position: 'relative', display: 'inline-flex'}}
      size={size || '50px'}
      accentColor={accentColor}
    >
      <StyledCircullarProgress variant="determinate" value={value} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!withoutTextInMiddle && (
          <Text size="very-small">{`${Math.round(value)}%`}</Text>
        )}
      </Box>
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)<{size: string; accentColor?: boolean}>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};

  .MuiCircularProgress-root {
    width: ${(props) => props.size} !important;
    height: ${(props) => props.size} !important;
  }

  .MuiCircularProgress-colorPrimary {
    color: ${(props) =>
      props.accentColor ? props.theme.accentColor : props.theme.secondaryColor};
  }
`

const StyledCircullarProgress = styled(CircularProgress)``

export default CircullarProgressWithLabel
