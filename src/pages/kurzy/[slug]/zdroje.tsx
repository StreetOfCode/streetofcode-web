import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useGetCourseOverview} from '../../../api/courseOverview'
import {QueryGuard} from '../../../QueryGuard'
import {useRouter} from 'next/router'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../../components/Loading'
import dynamic from 'next/dynamic'
import Head from '../../../components/Head'
import {prefixWithHost, routes} from '../../../routes'
import * as Utils from '../../../utils'

type Props = {
  courseSlug: string
  chapterId: number
  lectureId: number
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
    })
  }

  if (
    getCourseOverview.data &&
    !Utils.isCourseOwnedByUser(getCourseOverview.data)
  ) {
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
            url={prefixWithHost(routes.kurzy.zdroje(courseOverview.slug))}
            imageUrl={courseOverview.iconUrl}
            noIndex
          />
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
