import React, {useState} from 'react'
import styled from 'styled-components'
import Vimeo, {TimeUpdateEvent} from '@u-wave/react-vimeo'
import NextLectureOverlay from './NextLectureOverlay'
import {storage} from '../../../localStorage'

type Props = {
  className?: string
  autoplay?: boolean
  vimeoVideoId: string
  onVideoEnded?: () => void
  nextLectureUrl?: string
  nextLectureName?: string
  hasQuiz: boolean
}

const VideoWrapper = ({
  className,
  autoplay,
  vimeoVideoId,
  onVideoEnded,
  nextLectureUrl,
  nextLectureName,
  hasQuiz,
}: Props) => {
  const [showNextLectureOverlay, setShowNextLectureOverlay] = useState(false)

  const handleOnVideoEnded = () => {
    if (onVideoEnded) {
      onVideoEnded()
    }

    storage.deleteVideoWatchTime(vimeoVideoId)

    if (nextLectureUrl && nextLectureName) {
      setShowNextLectureOverlay(true)
    }
  }

  return (
    <StyledVideoWrapper className={className}>
      <Vimeo
        speed
        keyboard
        video={vimeoVideoId}
        autoplay={autoplay}
        onEnd={handleOnVideoEnded}
        start={storage.getVideoWatchTime(vimeoVideoId).seconds}
        onTimeUpdate={(event: TimeUpdateEvent) => {
          const videoSecondsWatched =
            storage.getVideoWatchTime(vimeoVideoId).seconds
          const secondsWatched = Math.floor(event.seconds)
          const updateIntervalSeconds = 5
          if (secondsWatched - videoSecondsWatched > updateIntervalSeconds) {
            storage.setVideoWatchTime(vimeoVideoId, {seconds: secondsWatched})
          }
        }}
      />
      {showNextLectureOverlay && nextLectureUrl && nextLectureName && (
        <NextLectureOverlay
          lectureTitle={nextLectureName}
          lectureUrl={nextLectureUrl}
          onClosed={() => setShowNextLectureOverlay(false)}
          hasQuiz={hasQuiz}
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
