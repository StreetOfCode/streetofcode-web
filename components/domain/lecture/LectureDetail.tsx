import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLecture} from '../../api/lecture'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import LectureComments from '../lecture-comment/LectureComments'
import LectureQuiz from './LectureQuiz'
import VideoWrapper from '../video/VideoWrapper'

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
            {lecture.videoUrl && <VideoWrapper vimeoVideoId={lecture.videoUrl} autoplay />}
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

export default LectureDetail
