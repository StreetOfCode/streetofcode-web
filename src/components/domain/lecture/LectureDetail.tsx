import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLecture} from '../../api/lecture'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import LectureComments from '../lecture-comment/LectureComments'
import LectureQuiz from './LectureQuiz'
import VideoWrapper from '../video/VideoWrapper'
import { useRouter } from 'next/router'

type Props = {
  lectureId: number
}

const LectureDetail = ({lectureId}: Props) => {
  const router = useRouter()
  const getLectureQuery = useGetLecture(lectureId)

  // query param autoplay is sent from TakeCoursePage when user starts or continues course
  const shouldAutoPlayLecture = router.query.autoplay !== 'false'

  return (
    <QueryGuard {...getLectureQuery}>
      {(lecture) => {
        return (
          <Flex direction="column" gap="32px">
            {lecture.videoUrl && (
              <VideoWrapper vimeoVideoId={lecture.videoUrl} autoplay={shouldAutoPlayLecture} />
            )}
            {lecture.content && <MarkdownView children={lecture.content} />}
            <LectureQuiz lecture={lecture} />
            <LectureComments lectureId={lecture.id} />
          </Flex>
        )
      }}
    </QueryGuard>
  )
}

export default LectureDetail
