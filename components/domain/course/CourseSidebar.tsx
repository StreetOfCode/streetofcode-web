import React, {HTMLAttributes} from 'react'
import styled, {keyframes} from 'styled-components'
import {ChapterProgressOverview, CourseProgressOverview, LectureProgressOverview} from '../../../types'
import Flex from '../../core/Flex'
import {ChevronDownIcon} from '@radix-ui/react-icons'
import {AiOutlinePlayCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import {MdCheckBoxOutlineBlank, MdCheckBox} from 'react-icons/md'
import {GrNotes} from 'react-icons/gr'
import {CgNotes} from 'react-icons/cg'
import * as Accordion from '@radix-ui/react-accordion'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import * as Utils from '../../../utils'
import CircullarProgressWithLabel from '../../CircullarProgressWithLabel'
import {useRouter} from 'next/router'
import NextLink from '../../core/NextLink'

type Props = {
  className?: string
  courseProgressOverview: CourseProgressOverview
  courseId: string
  chapterId?: string
  lectureId?: string
  resetLectureFunction: (lectureId: number) => void
  updateProgressLectureFuntion: (lectureId: number) => void
  hasResources?: boolean
} & HTMLAttributes<HTMLElement>


// TODO verticall scrollbar if necessary
const CourseSidebar = ({
  className,
  courseProgressOverview,
  courseId,
  chapterId,
  lectureId,
  resetLectureFunction,
  updateProgressLectureFuntion,
  hasResources,
  ...props
}: Props) => {

  const router = useRouter()

  const getChapterLengthInfo = (chapter: ChapterProgressOverview): React.ReactNode => {
    return (
      <Text>
        {chapter.lectures.length} {Utils.numOfLecturesText(chapter.lectures.length)}
        { } | {chapter.chapterDurationMinutes} {Utils.numOfMinutesText(chapter.chapterDurationMinutes)}
      </Text>
    )
  }

  const handleLectureOnClick = (e: React.MouseEvent, chapterId: number, lectureId: number) => {
    e.preventDefault()
    e.stopPropagation()

    router.push(`/course/${courseId}/take/chapter/${chapterId}/lecture/${lectureId}`)
  }

  const handleResetLectureProgress = (e: React.MouseEvent, lectureId: number) => {
    e.preventDefault()
    e.stopPropagation()

    resetLectureFunction(lectureId)
  }

  const handleUpdateLectureProgress = (e: React.MouseEvent, lectureId: number) => {
    e.preventDefault()
    e.stopPropagation()

    updateProgressLectureFuntion(lectureId)
  }

  const handleResourcesClick = () => {
    router.push(`/course/${courseId}/take/resources`)
  }

  const progressValuePercent =
    (courseProgressOverview.lecturesViewed / courseProgressOverview.courseLecturesCount) * 100


  const renderLectureTypeIcon = (lecture: LectureProgressOverview) => {
    if (lecture.lectureType === 'VIDEO') {
      return <AiOutlinePlayCircle />
    } else if (lecture.lectureType === 'TEXT') {
      return <CgNotes />
    } else {
      return <AiOutlineQuestionCircle />
    }
  }

  return (
    <>
      <Flex direction="column" gap="16px" className={className} {...props}>
        <Flex justifyContent="space-between" alignSelf="stretch">
          <Flex gap="12px" alignSelf="flex-start">
            <CircullarProgressWithLabel value={progressValuePercent} accentColor />
            <Text>
              {courseProgressOverview.lecturesViewed} / {courseProgressOverview.courseLecturesCount}
            </Text>
          </Flex>

          {hasResources &&
            <NextLink
              href={{pathname: `/course/${courseId}/take/resources`, query: {chapterId, lectureId}}}
              alignSelf="center"
            >
              <ResourcesWrapper gap="8px" onClick={() => handleResourcesClick()}>
                <Text withAccentUnderline>Materiály</Text>
                <GrNotes />
              </ResourcesWrapper>
            </NextLink>
          }
        </Flex>

        <AccordionRoot
          type="multiple"
          defaultValue={courseProgressOverview.chapters.map((chapter) => chapter.id.toString())
          }
        >
          {courseProgressOverview.chapters.map((chapter) => (
            <Item value={chapter.id.toString()} key={chapter.id}>
              <Header>
                <Trigger>
                  <Flex direction="column" alignItems="flex-start" gap="8px">
                    <Heading variant="h5" normalWeight>{chapter.name}</Heading>
                    {getChapterLengthInfo(chapter)}
                  </Flex>
                  <AccordionChevron />
                </Trigger>
              </Header>
              {chapter.lectures.map((lecture) => (
                <ItemContent
                  key={lecture.id}
                  onClick={(e) => handleLectureOnClick(e, chapter.id, lecture.id)}
                  selected={lectureId !== undefined && lecture.id === parseInt(lectureId, 10)}
                >
                  <Flex gap="12px" justifyContent="space-between" flex="1">
                    <Flex gap="8px">
                      {renderLectureTypeIcon(lecture)}
                      <Flex direction="column" alignItems="flex-start" gap="2px">
                        <StyledText>{lecture.name}</StyledText>
                        {lecture.videoDurationSeconds > 0 &&
                        <StyledText size="small">
                          {Utils.formatDurationFromSeconds(lecture.videoDurationSeconds)}
                        </StyledText>
                        }
                      </Flex>
                    </Flex>
                    {/* TODO use CheckBox core component */}
                    {lecture.viewed &&
                      <MdCheckBox onClick={(e) => handleResetLectureProgress(e, lecture.id)} />
                    }
                    {!lecture.viewed &&
                    <MdCheckBoxOutlineBlank onClick={(e) => handleUpdateLectureProgress(e, lecture.id)} />
                    }
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
    width: 16px;
    height: 16px;
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

  [data-state=open] & {
    animation: ${openContentAnimation} 300ms ease-out forwards;
  };

  [data-state=closed] & {
    animation: ${closeContentAnimation} 300ms ease-out forwards;
  };

  color: ${(props) => props.selected ? props.theme.accentColor : 'unset'};

  ${StyledText} {
    color: ${(props) => props.selected ? props.theme.accentColor  : 'unset'};
  }
`

const AccordionChevron = styled(ChevronDownIcon)`
  transition: transform 300ms;
  [data-state=open] & {
    transform: rotate(180deg);
  };

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


export default CourseSidebar
