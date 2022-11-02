import React, {useEffect, useRef, useState, useMemo} from 'react'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import MarkdownView from '../../core/MarkdownView'
import styled, {css} from 'styled-components'
import Flex, {JustifyContent} from '../../core/Flex'
import Heading from '../../core/Heading'
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
import BackLink from '../../core/BackLink'

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
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [sidebarRef])

  const handleClick = (event: MouseEvent) => {
    if (
      event.which === 1 &&
      event.target instanceof Node &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setMobileSidebarOpen(false)
    }
  }

  const Lecture = useMemo(
    () => () => {
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

            <Heading variant="h4" normalWeight withAccentUnderline>
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
    },
    [lectureId],
  )

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
          <Heading variant="h4" normalWeight withAccentUnderline>
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
        <Sidebar ref={sidebarRef} mobileOpen={mobileSidebarOpen}>
          <DesktopTopWrapper
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <BackLink
              to={`/kurzy/${courseOverview.slug}`}
              text={'Späť na kurz'}
            />
            <StyledThemeSwitcher />
          </DesktopTopWrapper>
          <MobileTopWrapper direction="column" gap="16px" alignItems="stretch">
            <Flex justifyContent="space-between" gap="8px">
              <MobileBackLink
                to={`/kurzy/${courseOverview.slug}`}
                text={'Späť na kurz'}
              />
              <MobileSidebarCloseIcon
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              />
            </Flex>
            <StyledThemeSwitcher />
          </MobileTopWrapper>
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

const DesktopTopWrapper = styled(Flex)`
  @media ${device.S} {
    display: none;
  }
`

const MobileTopWrapper = styled(Flex)`
  display: none;

  @media ${device.S} {
    display: flex;
  }
`

const StyledThemeSwitcher = styled(ThemeSwitcher)`
  margin-bottom: 12px;
`

const Sidebar = styled.div<{mobileOpen: boolean}>`
  width: 300px;
  align-self: stretch;
  padding: 32px 16px;
  border-right: solid 1px ${(props) => props.theme.accentColor};
  flex-shrink: 0;

  overflow-y: scroll;
  max-height: 100%;
  position: absolute;
  z-index: 1;
  border-bottom: solid 1px ${(props) => props.theme.accentColor};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 1px 0 1px ${(props) => props.theme.accentColor};
    box-shadow: inset 1px 0 1px ${(props) => props.theme.accentColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.accentColor};
  }

  @media ${device.M} {
    width: 250px;
  }

  @media ${device.S} {
    display: ${(props) => (props.mobileOpen ? 'block' : 'none')};
    width: 300px;
    background-color: ${(props) => props.theme.primaryColor};
  }
`

const Content = styled.div`
  margin: 0 auto;
  width: calc(100% - 300px);
  margin-left: 300px;
  padding: 32px;
  align-self: stretch;

  > * {
    max-width: 1400px;
    margin: 0 auto;
  }

  @media ${device.M} {
    width: calc(100% - 250px);
    margin-left: 250px;
  }

  @media ${device.S} {
    width: calc(100%);
    margin-left: 0px;
  }
`

const EmptyBox = styled.div`
  visibility: hidden;
  flex: 1;

  @media ${device.S} {
    flex: 0;
  }
`

const Box = styled.div<{justifyContent: JustifyContent}>`
  display: flex;
  flex: 1;
  justify-content: ${(props) => props.justifyContent};

  @media ${device.S} {
    flex: 0;
  }
`

const ContentNavbarFlex = styled(Flex)`
  margin-bottom: 32px;

  @media ${device.S} {
    justify-content: center;
    gap: 32px;
  }
`

const MobileArrowLeft = styled(AiOutlineArrowLeft)`
  display: none;

  @media ${device.S} {
    display: block;
    width: 22px;
    height: 22px;
  }

  color: ${(props) => props.theme.secondaryColor};
`

const MobileArrowRight = styled(AiOutlineArrowRight)`
  display: none;

  @media ${device.S} {
    display: block;
    width: 22px;
    height: 22px;
  }

  color: ${(props) => props.theme.secondaryColor};
`

const ButtonPreviousLecture = styled(Button)`
  @media ${device.S} {
    display: none;
  }
`
const ButtonNextLecture = styled(Button)`
  @media ${device.S} {
    display: none;
  }
`

const mobileSidebarIconStyle = css`
  display: none;

  @media ${device.S} {
    display: block;
    width: 22px;
    height: 22px;

    &:hover {
      cursor: pointer;
    }
  }

  color: ${(props) => props.theme.secondaryColor};
`

const MobileSidebarOpenIcon = styled(AiOutlineMenu)`
  ${mobileSidebarIconStyle}
  margin: 0;
  margin-bottom: 8px;
`

const MobileSidebarCloseIcon = styled(AiOutlineClose)`
  ${mobileSidebarIconStyle}
`

const MobileBackLink = styled(BackLink)`
  margin-bottom: 0;
`

export default TakeCourse
