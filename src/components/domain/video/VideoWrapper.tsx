import React, {useState} from 'react'
import styled from 'styled-components'
import Vimeo from '@u-wave/react-vimeo'
import NextLectureOverlay from './NextLectureOverlay'

type Props = {
  className?: string
  autoplay?: boolean
  vimeoVideoId: string
  onVideoEnded?: () => void
  nextLectureUrl?: string
  nextLectureName?: string
}

const VideoWrapper = ({
  className,
  autoplay,
  vimeoVideoId,
  onVideoEnded,
  nextLectureUrl,
  nextLectureName,
}: Props) => {
  const [showNextLectureOverlay, setShowNextLectureOverlay] = useState(false)

  const handleOnVideoEnded = () => {
    if (onVideoEnded) {
      onVideoEnded()
    }

    if (nextLectureUrl && nextLectureName) {
      setShowNextLectureOverlay(true)
    }
  }

  return (
    <StyledVideoWrapper className={className}>
      <Vimeo
        speed
        video={vimeoVideoId}
        autoplay={autoplay}
        onEnd={handleOnVideoEnded}
      />
      {showNextLectureOverlay && nextLectureUrl && nextLectureName && (
        <NextLectureOverlay
          lectureTitle={nextLectureName}
          lectureUrl={nextLectureUrl}
          onClosed={() => setShowNextLectureOverlay(false)}
        />
      )}
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
