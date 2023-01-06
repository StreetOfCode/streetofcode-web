import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../../../../components/api/courseOverview'
import {QueryGuard} from '../../../../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../../../../AuthUserContext'
import Loading from '../../../../../../components/Loading'
import dynamic from 'next/dynamic'
import Head from '../../../../../../components/Head'

type Props = {
  courseSlug: string
  chapterId: number
  lectureId: number
}

const LazyTakeCourse = dynamic(
  () => import('../../../../../../components/domain/course/TakeCourse'),
  {
    ssr: false,
  },
)

const TakeCoursePage: NextPage<Props> = ({
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
      query: {returnTo: `/kurzy/${courseSlug}`},
    })
  }

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) => (
        <>
          <Head
            title={courseOverview.name}
            description={courseOverview.shortDescription}
            url={`https://streetofcode.sk/kurzy/${courseOverview.slug}`}
            imageUrl={courseOverview.iconUrl}
            noIndex
          />
          <LazyTakeCourse
            resourcesMode={false}
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
  const chapterId = Number(context?.params?.chapterId as string)
  const lectureId = Number(context?.params?.lectureId as string)

  return {
    props: {
      courseSlug,
      chapterId,
      lectureId,
    },
  }
}

export default TakeCoursePage
