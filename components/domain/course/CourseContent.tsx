import React, {HTMLAttributes} from 'react'
import styled, {keyframes} from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {ChapterOverview, CourseOverview} from '../../../types'
import {AiOutlinePlayCircle, AiOutlineFileText} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import * as Utils from '../../../utils'
import {useRouter} from 'next/router'
import {ChevronDownIcon} from '@radix-ui/react-icons'

type Props = {
  className?: string
  course: CourseOverview
} & HTMLAttributes<HTMLElement>

const CourseContent = ({className, course, ...props}: Props) => {
  const router = useRouter()

  const getChapterLengthInfo = (chapter: ChapterOverview): React.ReactNode => {
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

    router.push(`/course/${course.id}/take/chapter/${chapterId}/lecture/${lectureId}`)
  }


  return (
    <Wrapper className={className} {...props}>
      <AccordionRoot type="multiple" defaultValue={course.chapters.map((c) => c.id.toString())}>
        {course.chapters.map((chapter) => (
          <Item value={chapter.id.toString()} key={chapter.id}>
            <Header>
              <Trigger>
                <Heading variant="h4" normalWeight>{chapter.name}</Heading>
                <Flex gap="24px">
                  {getChapterLengthInfo(chapter)}
                  <AccordionChevron />
                </Flex>
              </Trigger>
            </Header>
            {chapter.lectures.map((lecture) => (
              <ItemContent
                key={lecture.id}
                onClick={(e) => handleLectureOnClick(e, chapter.id, lecture.id)
                }
              >
                <Flex gap="12px">
                  {/* TODO we need to introduce lectureType */}
                  {lecture.videoDurationSeconds > 0 && <AiOutlinePlayCircle />}
                  {lecture.videoDurationSeconds === 0 && <AiOutlineFileText />}
                  <StyledText>{lecture.name}</StyledText>
                </Flex>
                <Flex>
                  {lecture.videoDurationSeconds > 0 &&
                    <StyledText size="small">{
                      Utils.formatDurationFromSeconds(lecture.videoDurationSeconds)
                    }</StyledText>
                  }
                </Flex>
              </ItemContent>
            ))}
          </Item>
        ))}
      </AccordionRoot>
    </Wrapper>

  )
}

const Wrapper = styled.div``

const AccordionRoot = styled(Accordion.Root)`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  width: 650px;
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


const ItemContent = styled(Accordion.Content)`
  padding: 0 4px;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};

    ${StyledText} {
      color: ${(props) => props.theme.accentColor};
    }
  }

  [data-state=open] & {
    animation: ${openContentAnimation} 300ms ease-out forwards;
  };

  [data-state=closed] & {
    animation: ${closeContentAnimation} 300ms ease-out forwards;
  };
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


export default CourseContent


