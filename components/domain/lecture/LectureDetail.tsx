import React from 'react'
import styled from 'styled-components'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLecture} from '../../api/lecture'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import LectureComments from '../lecture-comment/LectureComments'
import LectureQuiz from './LectureQuiz'

type Props = {
  lectureId: number
}

const LectureDetail = ({lectureId}: Props) => {
  const getLectureQuery = useGetLecture(lectureId)

  return (
    <QueryGuard {...getLectureQuery}>
      {(lecture) => {
        return (
          <Flex direction="column"  gap="32px">
            {lecture.videoUrl && (
              <VideoWrapper>
                <iframe
                  title={lecture.name}
                  src={`${lecture.videoUrl}?rel=0&modestbranding=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
                  allowFullScreen
                />
              </VideoWrapper>
            )}
            {lecture.content && (
              <MarkdownView children={lecture.content} />
            )}
            <LectureQuiz lecture={lecture} />
            <LectureComments lectureId={lecture.id} />
          </Flex>
        )
      }}
    </QueryGuard>
  )
}

const VideoWrapper = styled.div`
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

export default LectureDetail
