import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Vimeo, {TimeUpdateEvent} from '@u-wave/react-vimeo'
import NextLectureOverlay from './NextLectureOverlay'

const lastVideoStorageKey = 'lastVideo'

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
  const [startVideoAt, setStartVideoAt] = useState(0)
  const [hasEnded, setHasEnded] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoSecondsWatched, setVideoSecondsWatched] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      const videoInfo = localStorage.getItem(lastVideoStorageKey)
      if (videoInfo) {
        const {videoId, seconds} = loadVideoInfo(videoInfo)
        if (videoId === vimeoVideoId) {
          setStartVideoAt(Number(seconds))
        }
      }

      isFirstRender.current = false
      setVideoReady(true)
    } else {
      if (!hasEnded && videoSecondsWatched > 0) {
        // user left lecture before video ended
        localStorage.setItem(lastVideoStorageKey, saveVideoInfo())
      }
    }
  }, [videoSecondsWatched])

  useEffect(() => {
    if (hasEnded) {
      // clear storage key
      localStorage.setItem(lastVideoStorageKey, '')
    }
  }, [hasEnded])

  const loadVideoInfo = (videoInfo: string) => {
    const [videoId, seconds] = videoInfo.split('_')
    return {videoId, seconds}
  }

  const saveVideoInfo = () => {
    return `${vimeoVideoId}_${videoSecondsWatched}`
  }

  const handleOnVideoEnded = () => {
    setHasEnded(true)

    if (onVideoEnded) {
      onVideoEnded()
    }

    if (nextLectureUrl && nextLectureName) {
      setShowNextLectureOverlay(true)
    }
  }

  if (!videoReady) {
    return <></>
  }

  return (
    <StyledVideoWrapper className={className}>
      <Vimeo
        speed
        keyboard
        video={vimeoVideoId}
        autoplay={autoplay}
        onEnd={handleOnVideoEnded}
        start={startVideoAt}
        onTimeUpdate={(event: TimeUpdateEvent) => {
          const secondsWatched = Math.floor(event.seconds)
          if (secondsWatched > videoSecondsWatched) {
            // update every second
            setVideoSecondsWatched(secondsWatched)
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
