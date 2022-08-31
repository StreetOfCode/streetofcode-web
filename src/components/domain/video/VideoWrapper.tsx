import React from 'react'
import styled from 'styled-components'
import Vimeo from '@u-wave/react-vimeo'

type Props = {
  className?: string
  autoplay?: boolean
  vimeoVideoId: string
}

const VideoWrapper = ({className, autoplay, vimeoVideoId}: Props) => {
  return (
    <StyledVideoWrapper className={className}>
      <Vimeo video={vimeoVideoId} autoplay={autoplay} />
    </StyledVideoWrapper>
  )
}

const StyledVideoWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

export default VideoWrapper
