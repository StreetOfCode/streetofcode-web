import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../components/api/courseOverview'
import {QueryGuard} from '../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../AuthUserContext'
import TakeCourse from '../../../components/domain/course/TakeCourse'

type Props = {
  courseSlug: string
  chapterId: string
  lectureId: string
}

const ResourcesPage: NextPage<Props> = ({courseSlug, chapterId, lectureId}: Props) => {
  const getCourseOverview = useGetCourseOverview(courseSlug, true)
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
          resourcesMode
          courseOverview={courseOverview}
          chapterId={chapterId}
          lectureId={lectureId}
        />)
      }
    </QueryGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseSlug = context?.params?.slug as string
  const chapterId = context?.query?.chapterId as string
  const lectureId = context?.query?.lectureId as string

  return {
    props: {
      courseSlug,
      chapterId,
      lectureId,
    },
  }
}

export default ResourcesPage
