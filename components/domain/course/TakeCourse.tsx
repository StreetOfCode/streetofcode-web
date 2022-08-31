import React, {useState} from 'react'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import MarkdownView from '../../core/MarkdownView'
import BackLink from '../../core/BackLink'
import styled, {css} from 'styled-components'
import Flex, {JustifyContent} from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import CourseSidebar from './CourseSidebar'
import LectureDetail from '../lecture/LectureDetail'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai'
import {getPrevAndNextUrl, GetPrevAndNextUrlResponse} from '../../../utils'
import {useGetCourseProgressOverview} from '../../api/courseProgress'
import {CourseOverview} from '../../../types'
import {QueryGuard} from '../../../QueryGuard'
import {device} from '../../../theme/device'
import ThemeSwitcher from '../../../theme/ThemeSwitcher'

type Props = {
  resourcesMode: boolean
  courseOverview: CourseOverview
  chapterId: string
  lectureId: string
}

const TakeCourse = ({
  resourcesMode,
  courseOverview,
  chapterId,
  lectureId,
}: Props) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const getCourseProgressOverview = useGetCourseProgressOverview(
    Number(courseOverview.id),
  )

  const Lecture = () => {
    const {currentLecture, previousLectureUrl, nextLectureUrl} =
      getPrevAndNextUrl(courseOverview, lectureId, chapterId) ||
      ({} as GetPrevAndNextUrlResponse)

    return (
      <>
        <MobileSidebarOpenIcon
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <ContentNavbarFlex justifyContent="space-between" gap="8px">
          {previousLectureUrl ? (
            <Box justifyContent="flex-start">
              <NextLink href={previousLectureUrl}>
                <ButtonPreviousLecture variant="outline">
                  Predošlá lekcia
                </ButtonPreviousLecture>
                <MobileArrowLeft />
              </NextLink>
            </Box>
          ) : (
            <EmptyBox />
          )}

          <Heading variant="h2" normalWeight withAccentUnderline>
            {currentLecture?.name}
          </Heading>

          {nextLectureUrl ? (
            <Box justifyContent="flex-end">
              <NextLink href={nextLectureUrl}>
                <ButtonNextLecture variant="outline">
                  Ďalšia lekcia
                </ButtonNextLecture>
                <MobileArrowRight />
              </NextLink>
            </Box>
          ) : (
            <EmptyBox />
          )}
        </ContentNavbarFlex>
        <LectureDetail lectureId={Number(lectureId)} />
      </>
    )
  }

  const Resources = () => {
    if (!courseOverview.resources) return null

    const lectureUrl = `/kurzy/${courseOverview.slug}/kapitola/${chapterId}/lekcia/${lectureId}`

    return (
      <>
        <ContentNavbarFlex justifyContent="space-between">
          <Box justifyContent="flex-start">
            <NextLink href={lectureUrl}>
              <ButtonPreviousLecture variant="outline">
                Späť
              </ButtonPreviousLecture>
              <MobileArrowLeft />
            </NextLink>
          </Box>
          <Heading variant="h2" normalWeight withAccentUnderline>
            Materiály
          </Heading>
          <EmptyBox />
        </ContentNavbarFlex>
        <MarkdownView children={courseOverview.resources} />
      </>
    )
  }

  return (
    <>
      <WrapperFlex alignSelf="stretch" flex="1">
        <Sidebar mobileOpen={mobileSidebarOpen}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <StyledBackLink
              to={`/kurzy/${courseOverview.slug}`}
              text={'Späť na kurz'}
            />
            <ThemeSwitcher />
          </Flex>
          <MobileSidebarHeaderFlex justifyContent="space-between">
            <NextLink href={'/kurzy'}>
              <Text size="very-small">Zobraziť všetky kurzy</Text>
            </NextLink>
            <MobileSidebarCloseIcon
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            />
          </MobileSidebarHeaderFlex>
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
  z-index: 0;
  position: relative;
`

const Sidebar = styled.div<{mobileOpen: boolean}>`
  width: 300px;
  align-self: stretch;
  padding: 32px 16px;
  border-right: solid 1px ${(props) => props.theme.accentColor};
  flex-shrink: 0;

  @media ${device.tablet} {
    width: 250px;
  }

  @media ${device.mobile} {
    display: ${(props) => (props.mobileOpen ? 'block' : 'none')};
    position: absolute;
    z-index: 1;
    width: 300px;
    border-bottom: solid 1px ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.primaryColor};
  }
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  padding: 32px;
  align-self: stretch;
`

const EmptyBox = styled.div`
  visibility: hidden;
  flex: 1;

  @media ${device.mobile} {
    flex: 0;
  }
`

const Box = styled.div<{justifyContent: JustifyContent}>`
  display: flex;
  flex: 1;
  justify-content: ${(props) => props.justifyContent};

  @media ${device.mobile} {
    flex: 0;
  }
`

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;

  @media ${device.mobile} {
    justify-content: center;
    gap: 32px;
  }
`

const MobileArrowLeft = styled(AiOutlineArrowLeft)`
  display: none;

  @media ${device.mobile} {
    display: block;
    width: 22px;
    height: 22px;
  }
`

const MobileArrowRight = styled(AiOutlineArrowRight)`
  display: none;

  @media ${device.mobile} {
    display: block;
    width: 22px;
    height: 22px;
  }
`

const ButtonPreviousLecture = styled(Button)`
  @media ${device.mobile} {
    display: none;
  }
`
const ButtonNextLecture = styled(Button)`
  @media ${device.mobile} {
    display: none;
  }
`

const mobileSidebarIconStyle = css`
  display: none;

  @media ${device.mobile} {
    display: block;
    width: 22px;
    height: 22px;

    &:hover {
      cursor: pointer;
    }
  }
`

const MobileSidebarOpenIcon = styled(AiOutlineMenu)`
  ${mobileSidebarIconStyle}
`

const MobileSidebarCloseIcon = styled(AiOutlineClose)`
  ${mobileSidebarIconStyle}
`

const StyledBackLink = styled(BackLink)`
  @media ${device.mobile} {
    display: none !important;
  }
`

const MobileSidebarHeaderFlex = styled(Flex)`
  display: none;

  @media ${device.mobile} {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 16px;
  }
`

export default TakeCourse
