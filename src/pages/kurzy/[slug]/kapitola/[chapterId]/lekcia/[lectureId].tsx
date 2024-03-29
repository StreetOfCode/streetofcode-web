import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../../../../api/courseOverview'
import {QueryGuard} from '../../../../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../../../../AuthUserContext'
import Loading from '../../../../../../components/Loading'
import dynamic from 'next/dynamic'
import Head from '../../../../../../components/Head'
import {prefixWithHost, routes} from '../../../../../../routes'
import * as Utils from '../../../../../../utils'
import Heading from '../../../../../../components/core/Heading'

type Props = {
  courseSlug: string
  chapterId: number
  lectureId: number
}

const LazyTakeCourse = dynamic(
  () =>
    import('../../../../../../components/domain/course/TakeCourse').catch(
      () => {
        return () => (
          <Heading variant="h4" align="center">
            Chyba pri načítaní kurzu. Skús obnoviť stránku
          </Heading>
        )
      },
    ),
  {
    ssr: false,
    loading: () => <Loading />,
  },
)

const TakeCoursePage: NextPage<Props> = ({
  courseSlug,
  chapterId,
  lectureId,
}: Props) => {
  const {user, isLoading} = useAuth()
  const getCourseOverview = useGetCourseOverview(courseSlug, !!user)
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    // this page can be seen only by logged in users
    router.push({
      pathname: routes.login.redirectUri(encodeURIComponent(location.pathname)),
      query: {returnTo: routes.kurzy.slug(courseSlug)},
    })
  }

  if (
    getCourseOverview.data &&
    !Utils.isCourseOwnedByUser(getCourseOverview.data)
  ) {
    // this page can be seen only by users who own the course
    router.push({
      pathname: routes.kurzy.slug(courseSlug),
    })
  }

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) => (
        <>
          <Head
            title={courseOverview.name}
            description={courseOverview.shortDescription}
            url={prefixWithHost(routes.kurzy.slug(courseOverview.slug))}
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
