import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {ChapterOverview, CourseOverview, LectureOverview} from '../../../../../../../types'
import {useGetCourseOverview} from '../../../../../../../components/api/courseOverview'
import {QueryGuard} from '../../../../../../../QueryGuard'
import Button from '../../../../../../../components/core/Button'
import NextLink from '../../../../../../../components/core/NextLink'
import Heading from '../../../../../../../components/core/Heading'
import MarkdownView from '../../../../../../../components/core/MarkdownView'
import BackLink from '../../../../../../../components/core/BackLink'
import styled from 'styled-components'
import Flex from '../../../../../../../components/core/Flex'
import CourseSidebar from '../../../../../../../components/domain/course/CourseSidebar'
import LectureDetail from '../../../../../../../components/domain/lecture/LectureDetail'
import {useRouter} from 'next/router'
import {useGetCourseProgressOverview} from '../../../../../../../components/api/courseProgress'

type Props = {
  courseId: string
  chapterId: string
  lectureId: string
}

interface GetPrevAndNextUrlResponse {
  currentLecture: LectureOverview | undefined
  previousLectureUrl: string | undefined
  nextLectureUrl: string | undefined
}

export interface ResourcesProps {
  chapterId: number | undefined
  lectureId: number | undefined
}

const TakeCoursePage: NextPage<Props> = ({courseId, chapterId, lectureId}: Props) => {
  const getCourseOverview = useGetCourseOverview(parseInt(courseId, 10), true)

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) =>
        (<TakeCoursePageContent
          courseOverview={courseOverview}
          chapterId={chapterId}
          lectureId={lectureId}
        />)
      }
    </QueryGuard>
  )
}

const TakeCoursePageContent = (
  {courseOverview, chapterId, lectureId}:
  {courseOverview: CourseOverview, chapterId: string, lectureId: string},
) => {
  const router = useRouter()
  const getCourseProgressOverview = useGetCourseProgressOverview(Number(courseOverview.id))

  const getPrevAndNextUrl = (
    courseOverview: CourseOverview,
  ): GetPrevAndNextUrlResponse | undefined => {
    if (!lectureId || !chapterId) return undefined

    const chapters = courseOverview?.chapters ?? null
    if (chapters == null) return undefined

    let current: { chapter: null | ChapterOverview; lecture: null | LectureOverview } = {
      chapter: null,
      lecture: null,
    }

    let previous: {
      chapter: null | ChapterOverview
      lecture: null | LectureOverview
    } = {chapter: null, lecture: null}

    let next: {
      chapter: null | ChapterOverview
      lecture: null | LectureOverview
    } = {chapter: null, lecture: null}

    let found = false
    for (const chapter of chapters) {
      if (next.chapter) break

      for (const lecture of chapter.lectures) {
        if (parseInt(lectureId, 10) === lecture.id) {
          found = true
          current = {chapter, lecture}
        } else if (found) {
          next = {chapter, lecture}
          break
        }

        if (!found) {
          previous = {chapter, lecture}
        }
      }
    }

    let previousLectureUrl
    if (previous.chapter != null && previous.lecture != null) {
      previousLectureUrl =
      `/course/${courseOverview.id}/take/chapter/${previous.chapter?.id}/lecture/${previous.lecture?.id}`
    }

    let nextLectureUrl
    if (next.chapter != null && next.lecture != null) {
      nextLectureUrl = `/course/${courseOverview.id}/take/chapter/${next.chapter?.id}/lecture/${next.lecture?.id}`
    }

    return {
      currentLecture: current.lecture || undefined,
      previousLectureUrl,
      nextLectureUrl,
    }
  }

  const Lecture = ({lectureId}: {lectureId: number}) => {
    const {
      currentLecture,
      previousLectureUrl,
      nextLectureUrl,
    } = getPrevAndNextUrl(courseOverview) || ({} as GetPrevAndNextUrlResponse)

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
      <LectureDetail lectureId={lectureId} />
    </>)
  }

  const Resources = () => {
    if (!courseOverview.resources) return null

    let lectureUrl
    if (router.query && router.query.chapterId && router.query.lectureId) {
      const chapterId = router.query.chapterId as string
      const lectureId = router.query.lectureId as string
      lectureUrl = `/course/${courseOverview.id}/take/chapter/${chapterId}/lecture/${lectureId}`
    }

    return (<>
      <ContentNavbarFlex justifyContent="space-between">
        {lectureUrl
          ? <NextLink href={lectureUrl} alignSelf="flex-start">
            <Button variant="outline" withoutUppercase normalWeight>
              Späť
            </Button>
          </NextLink>
          : <EmptyBox />}
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
          {(lectureId && chapterId) && (<Lecture lectureId={Number(lectureId)} />)}
          {(!lectureId && !chapterId) && (<Resources />)}
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

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;
`

const StyledNextLink = styled(NextLink)<{textAlign: string}>`
  flex: 1;
  text-align: ${(props) => props.textAlign};
`

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
