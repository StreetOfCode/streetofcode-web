import React from 'react'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import MarkdownView from '../../core/MarkdownView'
import BackLink from '../../core/BackLink'
import styled from 'styled-components'
import Flex, {JustifyContent} from '../../core/Flex'
import Heading from '../../core/Heading'
import CourseSidebar from './CourseSidebar'
import LectureDetail from '../lecture/LectureDetail'
import {getPrevAndNextUrl, GetPrevAndNextUrlResponse} from '../../../utils'
import {useGetCourseProgressOverview} from '../../api/courseProgress'
import {CourseOverview} from '../../../types'
import {QueryGuard} from '../../../QueryGuard'

type Props = {
  resourcesMode: boolean
  courseOverview: CourseOverview
  chapterId: string
  lectureId: string
}

const TakeCourse = ({resourcesMode, courseOverview, chapterId, lectureId}: Props) => {
  const getCourseProgressOverview = useGetCourseProgressOverview(Number(courseOverview.id))

  const Lecture = () => {
    const {
      currentLecture,
      previousLectureUrl,
      nextLectureUrl,
    } = getPrevAndNextUrl(courseOverview, lectureId, chapterId) || ({} as GetPrevAndNextUrlResponse)

    return (<>
      <ContentNavbarFlex justifyContent="space-between">
        {previousLectureUrl
          ? <Box justifyContent="flex-start">
            <NextLink href={previousLectureUrl}>
              <Button variant="outline" withoutUppercase normalWeight>
                Predošlá lekcia
              </Button>
            </NextLink>
          </Box>
          : <EmptyBox />
        }

        <Heading variant="h2" normalWeight withAccentUnderline>{currentLecture?.name}</Heading>

        {nextLectureUrl
          ? <Box justifyContent="flex-end">
            <NextLink href={nextLectureUrl}>
              <Button variant="outline" withoutUppercase normalWeight>
                Ďalšia lekcia
              </Button>
            </NextLink>
          </Box>
          : <EmptyBox />
        }
      </ContentNavbarFlex>
      <LectureDetail lectureId={Number(lectureId)} />
    </>)
  }


  const Resources = () => {
    if (!courseOverview.resources) return null

    const lectureUrl = `/kurzy/${courseOverview.slug}/kapitola/${chapterId}/lekcia/${lectureId}`

    return (<>
      <ContentNavbarFlex justifyContent="space-between">
        <Box justifyContent="flex-start">
          <NextLink href={lectureUrl}>
            <Button variant="outline" withoutUppercase normalWeight>
              Späť
            </Button>
          </NextLink>
        </Box>
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
          <BackLink to={`/kurzy/${courseOverview.slug}`} text={'Späť na kurz'} />
          <QueryGuard {...getCourseProgressOverview}>
            {(courseProgressOverview) => (
              <CourseSidebar
                courseProgressOverview={courseProgressOverview}
                courseId={courseOverview.id.toString()}
                courseSlug={courseOverview.slug}
                chapterId={chapterId}
                lectureId={lectureId}
                hasResources={!!courseOverview.resources}
              />
            )}
          </QueryGuard>
        </Sidebar>
        <Content>
          {resourcesMode && <Resources />}
          {!resourcesMode && <Lecture />}
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

const Box = styled.div<{justifyContent: JustifyContent}>`
  display: flex;
  flex: 1;
  justify-content: ${(props) => props.justifyContent};
`

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;
`
export default TakeCourse
