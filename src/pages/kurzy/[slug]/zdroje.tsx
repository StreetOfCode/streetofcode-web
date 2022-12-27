import React from 'react'
import Head from 'next/head'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../components/api/courseOverview'
import {QueryGuard} from '../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../AuthUserContext'
import {CourseOverview} from '../../../types'
import Loading from '../../../components/Loading'
import dynamic from 'next/dynamic'

type Props = {
  courseSlug: string
  chapterId: string
  lectureId: string
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

const LazyTakeCourse = dynamic(
  () => import('../../../components/domain/course/TakeCourse'),
  {
    ssr: false,
  },
)

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
          <LazyTakeCourse
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
