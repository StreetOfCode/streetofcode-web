import React from 'react'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import MarkdownView from '../../core/MarkdownView'
import BackLink from '../../core/BackLink'
import styled from 'styled-components'
import Flex from '../../core/Flex'
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
          ? <StyledNextLink href={previousLectureUrl} textAlign="left">
            <Button variant="outline" withoutUppercase normalWeight>
              Predošlá lekcia
            </Button>
          </StyledNextLink>
          : <EmptyBox />
        }

        <Heading variant="h2" normalWeight withAccentUnderline>{currentLecture?.name}</Heading>

        {nextLectureUrl
          ? <StyledNextLink href={nextLectureUrl} textAlign="right">
            <Button variant="outline" withoutUppercase normalWeight>
              Ďalšia lekcia
            </Button>
          </StyledNextLink>
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
        <StyledNextLink href={lectureUrl} textAlign="left">
          <Button variant="outline" withoutUppercase normalWeight>
            Späť
          </Button>
        </StyledNextLink>
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
const StyledNextLink = styled(NextLink)<{textAlign: string}>`
  flex: 1;
  text-align: ${(props) => props.textAlign};
`

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;
`
export default TakeCourse
