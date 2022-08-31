import React, {HTMLAttributes, useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import {ChapterProgressOverview, CourseProgressOverview} from '../../../types'
import Flex from '../../core/Flex'
import {BiChevronDown} from 'react-icons/bi'
import {CgNotes} from 'react-icons/cg'
import * as Accordion from '@radix-ui/react-accordion'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import * as Utils from '../../../utils'
import CircullarProgressWithLabel from '../../CircullarProgressWithLabel'
import {useRouter} from 'next/router'
import NextLink from '../../core/NextLink'
import {
  useResetLecture,
  useUpdateProgressLecture,
} from '../../api/courseProgress'
import CheckBox from '../../core/CheckBox'
import {device} from '../../../theme/device'

type Props = {
  className?: string
  courseProgressOverview: CourseProgressOverview
  courseId: string
  courseSlug: string
  chapterId: string
  lectureId: string
  hasResources?: boolean
} & HTMLAttributes<HTMLElement>

const CourseSidebar = ({
  className,
  courseProgressOverview,
  courseId,
  courseSlug,
  chapterId,
  lectureId,
  hasResources,
  ...props
}: Props) => {
  const router = useRouter()
  const resetLecture = useResetLecture(Number(courseId), courseSlug)
  const updateProgressLecture = useUpdateProgressLecture(
    Number(courseId),
    courseSlug,
  )

  useEffect(() => {
    const maybeUpdateProgressLecture = async () => {
      // if lecture is not already viewed
      if (
        !courseProgressOverview.chapters.find((chapter) =>
          chapter.lectures.find(
            (lecture) => lecture.id === Number(lectureId) && lecture.viewed,
          ),
        )
      ) {
        await updateProgressLecture.mutateAsync(Number(lectureId))
      }
    }

    maybeUpdateProgressLecture()
  }, [lectureId])

  const getChapterLengthInfo = (
    chapter: ChapterProgressOverview,
  ): React.ReactNode => {
    return (
      <Text>
        {chapter.lectures.length}{' '}
        {Utils.numOfLecturesText(chapter.lectures.length)}
        {} | {chapter.chapterDurationMinutes}{' '}
        {Utils.numOfMinutesText(chapter.chapterDurationMinutes)}
      </Text>
    )
  }

  const handleLectureOnClick = (
    e: React.MouseEvent,
    chapterId: number,
    lectureId: number,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    router.push(
      `/kurzy/${courseSlug}/kapitola/${chapterId}/lekcia/${lectureId}`,
    )
  }

  const handleLectureCheckboxOnClick = async (
    checkboxValue: boolean,
    lectureId: number,
  ) => {
    if (checkboxValue) {
      await updateProgressLecture.mutateAsync(lectureId)
    } else {
      await resetLecture.mutateAsync(lectureId)
    }
  }

  const progressValuePercent = Utils.getCourseProgressPercent(
    courseProgressOverview.lecturesViewed,
    courseProgressOverview.courseLecturesCount,
  )

  return (
    <>
      <Flex direction="column" gap="16px" className={className} {...props}>
        <TopWrapperFlex justifyContent="space-between" alignSelf="stretch">
          <Flex gap="12px" alignSelf="flex-start">
            <CircullarProgressWithLabel
              value={progressValuePercent}
              accentColor
            />
            <Text>
              {courseProgressOverview.lecturesViewed} /{' '}
              {courseProgressOverview.courseLecturesCount}
            </Text>
          </Flex>

          {hasResources && (
            <NextLink
              href={{
                pathname: `/kurzy/${courseSlug}/zdroje`,
                query: {chapterId, lectureId},
              }}
              alignSelf="center"
            >
              <ResourcesWrapper gap="8px">
                <Text withAccentUnderline>Materiály</Text>
                <ResourcesIcon />
              </ResourcesWrapper>
            </NextLink>
          )}
        </TopWrapperFlex>

        <AccordionRoot
          type="multiple"
          defaultValue={courseProgressOverview.chapters
            .filter((chapter) => chapter.id === Number(chapterId))
            .map((chapter) => chapter.id.toString())}
        >
          {courseProgressOverview.chapters.map((chapter) => (
            <Item value={chapter.id.toString()} key={chapter.id}>
              <Header>
                <Trigger>
                  <Flex direction="column" alignItems="flex-start" gap="8px">
                    <Heading variant="h5" normalWeight>
                      {chapter.name}
                    </Heading>
                    {getChapterLengthInfo(chapter)}
                  </Flex>
                  <AccordionChevron />
                </Trigger>
              </Header>
              {chapter.lectures.map((lecture) => (
                <ItemContent
                  key={lecture.id}
                  onClick={(e) =>
                    handleLectureOnClick(e, chapter.id, lecture.id)
                  }
                  selected={
                    lectureId !== undefined && lecture.id === Number(lectureId)
                  }
                >
                  <Flex gap="12px" justifyContent="space-between" flex="1">
                    <Flex gap="8px">
                      {Utils.getLectureTypeIcon(lecture.lectureType)}
                      <Flex
                        direction="column"
                        alignItems="flex-start"
                        gap="2px"
                      >
                        <StyledText>{lecture.name}</StyledText>
                        {lecture.videoDurationSeconds > 0 && (
                          <StyledText size="small">
                            {Utils.formatDurationFromSeconds(
                              lecture.videoDurationSeconds,
                            )}
                          </StyledText>
                        )}
                      </Flex>
                    </Flex>
                    <CheckBox
                      checked={lecture.viewed}
                      onToggle={(newValue) =>
                        handleLectureCheckboxOnClick(newValue, lecture.id)
                      }
                      alignSelf="center"
                    />
                  </Flex>
                </ItemContent>
              ))}
            </Item>
          ))}
        </AccordionRoot>
      </Flex>
    </>
  )
}

const AccordionRoot = styled(Accordion.Root)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  svg {
    width: 20px;
    height: 20px;
  }
`

const TopWrapperFlex = styled(Flex)`
  @media ${device.tablet} {
    align-self: flex-start;
    flex-direction: column;
    gap: 16px;
  }
`

const Header = styled(Accordion.Header)`
  margin: 0;
  padding: 0 4px 4px 4px;
  border-bottom: 2px solid ${(props) => props.theme.accentColor};
`

const Trigger = styled(Accordion.Trigger)`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Item = styled(Accordion.Item)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledText = styled(Text)``

const openContentAnimation = keyframes({
  from: {height: 0},
  to: {height: 'var(--radix-accordion-content-height)'},
})

const closeContentAnimation = keyframes({
  from: {height: 'var(--radix-accordion-content-height)'},
  to: {height: 0},
})

const ItemContent = styled(Accordion.Content)<{selected?: boolean}>`
  padding: 0 4px;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  [data-state='open'] & {
    animation: ${openContentAnimation} 300ms ease-out forwards;
  }

  [data-state='closed'] & {
    animation: ${closeContentAnimation} 300ms ease-out forwards;
    overflow: hidden;
  }

  svg {
    color: ${(props) =>
      props.selected ? props.theme.accentColor : props.theme.secondaryColor};
  }

  ${StyledText} {
    color: ${(props) =>
      props.selected ? props.theme.accentColor : props.theme.secondaryColor};
  }
`

const AccordionChevron = styled(BiChevronDown)`
  transition: transform 300ms;
  [data-state='open'] & {
    transform: rotate(180deg);
  }

  &:hover {
    cursor: pointer;
  }

  flex-shrink: 0;
`

const ResourcesWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`
const ResourcesIcon = styled(CgNotes)`
  color: ${(props) => props.theme.secondaryColor};
`

export default CourseSidebar
