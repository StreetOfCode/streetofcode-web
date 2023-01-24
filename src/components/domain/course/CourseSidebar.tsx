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
} from '../../../api/courseProgress'
import CheckBox from '../../core/CheckBox'
import {device} from '../../../theme/device'
import {useRemoveUserAnswers} from '../../../api/quizQuestionUserAnswers'
import {routes} from '../../../routes'

type Props = {
  className?: string
  courseProgressOverview: CourseProgressOverview
  courseId: number
  courseSlug: string
  chapterId: number
  lectureId: number
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
  const resetLecture = useResetLecture(courseId, courseSlug)
  const resetQuiz = useRemoveUserAnswers()

  const updateProgressLecture = useUpdateProgressLecture(courseId)

  useEffect(() => {
    const maybeUpdateProgressLecture = async () => {
      const chapter = courseProgressOverview.chapters.find(
        (chapter) => chapter.id === chapterId,
      )
      const lecture =
        chapter && chapter.lectures.find((lecture) => lecture.id === lectureId)

      if (lecture && !lecture.viewed && lecture.lectureType === 'TEXT') {
        // if lecture is not already viewed and contains only TEXT
        // (video type lecture automatically  update their progress at the end of the video)
        // (quiz type lecture automatically update their progress when all questions are answered correctly)
        await updateProgressLecture.mutateAsync(lectureId)
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

    router.push(routes.kurzy.lekcia(courseSlug, chapterId, lectureId))
  }

  const handleLectureCheckboxOnClick = async (
    checkboxValue: boolean,
    lectureId: number,
  ) => {
    if (checkboxValue) {
      await updateProgressLecture.mutateAsync(lectureId)
    } else {
      await resetLecture.mutateAsync(lectureId)
      await resetQuiz.mutateAsync(lectureId)
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
                pathname: routes.kurzy.zdroje(courseSlug),
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
            .filter((chapter) => chapter.id === chapterId)
            .map((chapter) => chapter.id.toString())}
        >
          {courseProgressOverview.chapters.map((chapter) => (
            <Item value={chapter.id.toString()} key={chapter.id}>
              <Header>
                <Trigger>
                  <Flex direction="column" alignItems="flex-start" gap="8px">
                    <Heading variant="h6" normalWeight>
                      {chapter.name}
                    </Heading>
                    {getChapterLengthInfo(chapter)}
                  </Flex>
                  <AccordionChevron />
                </Trigger>
              </Header>
              <AccordionContent>
                {chapter.lectures.map((lecture) => (
                  <AccordionContentWrapper
                    key={lecture.id}
                    onClick={(e) =>
                      handleLectureOnClick(e, chapter.id, lecture.id)
                    }
                    selected={
                      lectureId !== undefined && lecture.id === lectureId
                    }
                    justifyContent="space-between"
                  >
                    <Flex gap="12px" justifyContent="space-between" flex="1">
                      <Flex gap="8px">
                        <LectureTypeIcon>
                          {Utils.getLectureTypeIcon(lecture.lectureType)}
                        </LectureTypeIcon>
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
                  </AccordionContentWrapper>
                ))}
              </AccordionContent>
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
  @media ${device.M} {
    align-self: flex-start;
    flex-direction: column;
    gap: 16px;
  }
`

const LectureTypeIcon = styled.span`
  flex-shrink: 0;
`

const Header = styled(Accordion.Header)`
  margin: 0;
  padding: 0 4px 4px 4px;
  border-bottom: 2px solid var(--color-accent);

  &:hover {
    cursor: pointer;
  }
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

const AccordionContent = styled(Accordion.Content)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  [data-state='open'] & {
    animation: ${openContentAnimation} 300ms ease-out forwards;
    overflow: hidden;
  }
  [data-state='closed'] & {
    animation: ${closeContentAnimation} 300ms ease-out forwards;
    overflow: hidden;
  }
`

const AccordionContentWrapper = styled(Flex)<{selected?: boolean}>`
  padding: 0 4px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  svg {
    color: ${(props) =>
      props.selected ? 'var(--color-accent)' : 'var(--color-secondary)'};
  }

  ${StyledText} {
    color: ${(props) =>
      props.selected ? 'var(--color-accent)' : 'var(--color-secondary)'};
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

  color: var(--color-secondary);
`

const ResourcesWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
const ResourcesIcon = styled(CgNotes)`
  color: var(--color-secondary);
`

export default CourseSidebar
