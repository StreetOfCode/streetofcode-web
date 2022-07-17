import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../../../../../components/api/courseOverview'
import {QueryGuard} from '../../../../../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../../../../../AuthUserContext'
import TakeCourse from '../../../../../../../components/domain/course/TakeCourse'

type Props = {
  courseId: string
  chapterId: string
  lectureId: string
}

const TakeCoursePage: NextPage<Props> = ({courseId, chapterId, lectureId}: Props) => {
  const getCourseOverview = useGetCourseOverview(Number(courseId), true)
  const {user} = useAuth()
  const router = useRouter()

  if (!user) {
    // this page can be seen only by logged in users
    router.replace({pathname: `/login/${encodeURIComponent(location.pathname)}`})
  }

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) =>
        (<TakeCourse
          resourcesMode={false}
          courseOverview={courseOverview}
          chapterId={chapterId}
          lectureId={lectureId}
        />)
      }
    </QueryGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId as string
  const chapterId = context?.params?.chapterId as string
  const lectureId = context?.params?.lectureId as string

  return {
    props: {
      courseId,
      chapterId,
      lectureId,
    },
  }
}

export default TakeCoursePage
