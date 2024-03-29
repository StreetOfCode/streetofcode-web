import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLecture} from '../../../api/lecture'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import LectureComments from '../lecture-comment/LectureComments'
import VideoWrapper from '../video/VideoWrapper'
import {useRouter} from 'next/router'
import {CourseProgressOverview} from '../../../types'
import {useUpdateProgressLecture} from '../../../api/courseProgress'
import LectureQuiz from './LectureQuiz'
import {useGetQuizzesByLecture} from '../../../api/quiz'

type Props = {
  courseId: number
  lectureId: number
  courseProgressOverview: CourseProgressOverview
  nextLectureUrl?: string
  nextLectureName?: string
}

const LectureDetail = ({
  courseId,
  lectureId,
  courseProgressOverview,
  nextLectureUrl,
  nextLectureName,
}: Props) => {
  const router = useRouter()
  const getLectureQuery = useGetLecture(lectureId)
  const updateProgressLecture = useUpdateProgressLecture(courseId)
  const quizzesByLecture = useGetQuizzesByLecture(lectureId)

  // query param autoplay is sent from TakeCoursePage when user starts or continues course
  const shouldAutoPlayLecture = router.query.autoplay !== 'false'

  const handleVideoEnded = async () => {
    const chapter = courseProgressOverview.chapters.find((chapter) =>
      chapter.lectures.find((lecture) => lecture.id === lectureId),
    )

    const lecture =
      chapter && chapter.lectures.find((lecture) => lecture.id === lectureId)

    if (lecture && !lecture.viewed && lecture.lectureType === 'VIDEO') {
      await updateProgressLecture.mutateAsync(lectureId)
    }
  }

  return (
    <QueryGuard {...getLectureQuery}>
      {(lecture) => (
        <QueryGuard {...quizzesByLecture}>
          {(quizzes) => (
            <Flex direction="column" gap="32px">
              {lecture.videoUrl && (
                <VideoWrapper
                  vimeoVideoId={lecture.videoUrl}
                  autoplay={shouldAutoPlayLecture}
                  onVideoEnded={handleVideoEnded}
                  nextLectureUrl={nextLectureUrl}
                  nextLectureName={nextLectureName}
                  hasQuiz={quizzes.length > 0}
                />
              )}
              {lecture.content && <MarkdownView children={lecture.content} />}
              <LectureQuiz lecture={lecture} />
              <LectureComments lectureId={lecture.id} />
            </Flex>
          )}
        </QueryGuard>
      )}
    </QueryGuard>
  )
}

export default LectureDetail
