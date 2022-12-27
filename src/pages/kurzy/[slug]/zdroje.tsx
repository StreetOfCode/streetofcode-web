import React from 'react'
import Head from 'next/head'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../components/api/courseOverview'
import {QueryGuard} from '../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../AuthUserContext'
import TakeCourse from '../../../components/domain/course/TakeCourse'
import {CourseOverview} from '../../../types'
import Loading from '../../../components/Loading'

type Props = {
  courseSlug: string
  chapterId: number
  lectureId: number
}

const Header = ({course}: {course: CourseOverview}) => {
  return (
    <Head>
      <title>{course.name}</title>
      <meta name="description" content={course.shortDescription} />
      <meta name="robots" content="noindex" />
    </Head>
  )
}

const ResourcesPage: NextPage<Props> = ({
  courseSlug,
  chapterId,
  lectureId,
}: Props) => {
  const getCourseOverview = useGetCourseOverview(courseSlug, true)
  const {user, isLoading} = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    // this page can be seen only by logged in users
    router.replace({
      pathname: `/login/${encodeURIComponent(location.pathname)}`,
    })
  }

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) => (
        <>
          <Header course={courseOverview} />
          <TakeCourse
            resourcesMode
            courseOverview={courseOverview}
            chapterId={chapterId}
            lectureId={lectureId}
          />
        </>
      )}
    </QueryGuard>
  )
}

// eslint-disable-next-line require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseSlug = context?.params?.slug as string
  const chapterId = Number(context?.query?.chapterId as string)
  const lectureId = Number(context?.query?.lectureId as string)

  return {
    props: {
      courseSlug,
      chapterId,
      lectureId,
    },
  }
}

export default ResourcesPage
