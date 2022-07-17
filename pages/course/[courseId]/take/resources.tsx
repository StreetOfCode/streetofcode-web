import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {CourseOverview} from '../../../../types'
import {useGetCourseOverview} from '../../../../components/api/courseOverview'
import {QueryGuard} from '../../../../QueryGuard'
import Button from '../../../../components/core/Button'
import NextLink from '../../../../components/core/NextLink'
import Heading from '../../../../components/core/Heading'
import MarkdownView from '../../../../components/core/MarkdownView'
import BackLink from '../../../../components/core/BackLink'
import styled from 'styled-components'
import Flex from '../../../../components/core/Flex'
import CourseSidebar from '../../../../components/domain/course/CourseSidebar'
import {useRouter} from 'next/router'
import {useGetCourseProgressOverview} from '../../../../components/api/courseProgress'
import {useAuth} from '../../../../AuthUserContext'

type Props = {
  courseId: string
  chapterId: string
  lectureId: string
}

const ResourcesPage: NextPage<Props> = ({courseId, chapterId, lectureId}: Props) => {
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
        (<ResourcesPageContent
          courseOverview={courseOverview}
          chapterId={chapterId}
          lectureId={lectureId}
        />)
      }
    </QueryGuard>
  )
}

const ResourcesPageContent = (
  {courseOverview, chapterId, lectureId}:
  {courseOverview: CourseOverview, chapterId: string, lectureId: string},
) => {
  const getCourseProgressOverview = useGetCourseProgressOverview(Number(courseOverview.id))

  const Resources = () => {
    if (!courseOverview.resources) return null

    const lectureUrl = `/course/${courseOverview.id}/take/chapter/${chapterId}/lecture/${lectureId}`

    return (<>
      <ContentNavbarFlex justifyContent="space-between">
        <StyledBackNextLink href={lectureUrl}>
          <Button variant="outline" withoutUppercase normalWeight>
            Späť
          </Button>
        </StyledBackNextLink>
        <Heading variant="h2" normalWeight withAccentUnderline>Materiály</Heading>
        <EmptyBox />
      </ContentNavbarFlex>
      <MarkdownView children={courseOverview.resources} />
    </>)
  }

  return (
    <>
      <WrapperFlex alignSelf="stretch" flex="1">
        <Sidebar>
          <BackLink to={`/course/${courseOverview.id}`} text={'Späť na kurz'} />
          <QueryGuard {...getCourseProgressOverview}>
            {(courseProgressOverview) => (
              <CourseSidebar
                courseProgressOverview={courseProgressOverview}
                courseId={courseOverview.id.toString()}
                chapterId={chapterId}
                lectureId={lectureId}
                hasResources={!!courseOverview.resources}
              />
            )}
          </QueryGuard>
        </Sidebar>
        <Content>
          <Resources />
        </Content>
      </WrapperFlex>
    </>
  )
}

const WrapperFlex = styled(Flex)`
  width: 100%;
`

const Sidebar = styled.div`
  width: 350px;
  align-self: stretch;
  padding: 32px 16px;
  border-right: solid 1px ${(props) => props.theme.accentColor};
`

const Content = styled.div`
  width: 100%;
  padding: 32px;
  align-self: stretch;
`

const EmptyBox = styled.div`
  visibility: hidden;
  flex: 1;
`

const StyledBackNextLink = styled(NextLink)`
  flex: 1;
  text-align: left;
`

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId as string
  const chapterId = context?.query?.chapterId as string
  const lectureId = context?.query?.lectureId as string

  return {
    props: {
      courseId,
      chapterId,
      lectureId,
    },
  }
}

export default ResourcesPage
