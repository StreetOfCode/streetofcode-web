import React, {HTMLAttributes, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {ChapterOverview, CourseOverview, LectureOverview} from '../../../types'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import * as Utils from '../../../utils'
import {useRouter} from 'next/router'
import {BiChevronDown} from 'react-icons/bi'
import {device} from '../../../theme/device'
import {routes} from '../../../routes'
import {useAuth} from '../../../AuthUserContext'
import LecturePreview from '../lecture/LecturePreview'

type Props = {
  className?: string
  course: CourseOverview
} & HTMLAttributes<HTMLElement>

const CourseContent = ({className, course, ...props}: Props) => {
  const router = useRouter()
  const {user} = useAuth()
  const [previewLectureInModal, setPreviewLectureInModal] =
    useState<LectureOverview | null>(null)

  // TODO extract this logic (it is same in CourseCTAButton)
  const hasProducts = course.courseProducts.length !== 0
  const ownedByUser = Utils.isCourseOwnedByUser(course)

  const states = {
    hasProductsAndIsOwnedByUser: hasProducts && ownedByUser,
    hasProductsButIsNotOwnedByUser: hasProducts && !ownedByUser,
    hasNoProductsAndIsLoggedIn: !hasProducts && user,
    hasNoProductsAndIsNotLoggedIn: !hasProducts && !user,
  }

  const isLectureClickable = (lecture: LectureOverview) => {
    if (states.hasNoProductsAndIsLoggedIn || states.hasProductsAndIsOwnedByUser)
      return true

    const allowPreviewWhenPaid = lecture.allowPreviewWhenPaid
    if (allowPreviewWhenPaid && states.hasProductsButIsNotOwnedByUser)
      return true

    return false
  }

  const shouldPreviewLectureForPaidCourse = (lecture: LectureOverview) => {
    return (
      isLectureClickable(lecture) &&
      (states.hasProductsAndIsOwnedByUser ||
        states.hasProductsButIsNotOwnedByUser)
    )
  }

  const getChapterLengthInfo = (chapter: ChapterOverview): React.ReactNode => {
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
    lecture: LectureOverview,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    if (shouldPreviewLectureForPaidCourse(lecture)) {
      setPreviewLectureInModal(lecture)
    } else if (isLectureClickable(lecture)) {
      router.push(routes.kurzy.lekcia(course.slug, chapterId, lectureId))
    }
  }

  return (
    <>
      <Wrapper className={className} {...props}>
        <AccordionRoot
          type="multiple"
          defaultValue={course.chapters.map((c) => c.id.toString())}
        >
          {course.chapters.map((chapter) => (
            <Item value={chapter.id.toString()} key={chapter.id}>
              <Header>
                <Trigger>
                  <Heading variant="h5" normalWeight>
                    {chapter.name}
                  </Heading>
                  <Flex gap="24px">
                    {getChapterLengthInfo(chapter)}
                    <AccordionChevron />
                  </Flex>
                </Trigger>
              </Header>
              <AccordionContent>
                {chapter.lectures.map((lecture) => (
                  <AccordionContentWrapper
                    key={lecture.id}
                    onClick={(e) =>
                      handleLectureOnClick(e, chapter.id, lecture.id, lecture)
                    }
                    clickable={isLectureClickable(lecture)}
                    justifyContent="space-between"
                  >
                    <Flex gap="12px">
                      <LectureTypeIcon>
                        {Utils.getLectureTypeIcon(lecture.lectureType)}
                      </LectureTypeIcon>
                      <StyledText>{lecture.name}</StyledText>
                      {shouldPreviewLectureForPaidCourse(lecture) && (
                        <PreviewText size="very-small" color="accent">
                          náhľad
                        </PreviewText>
                      )}
                    </Flex>
                    <Flex>
                      {lecture.videoDurationSeconds > 0 && (
                        <StyledText size="small">
                          {Utils.formatDurationFromSeconds(
                            lecture.videoDurationSeconds,
                          )}
                        </StyledText>
                      )}
                    </Flex>
                  </AccordionContentWrapper>
                ))}
              </AccordionContent>
            </Item>
          ))}
        </AccordionRoot>
      </Wrapper>
      {previewLectureInModal && (
        <LecturePreview
          lecture={previewLectureInModal}
          onClosePreview={() => setPreviewLectureInModal(null)}
        />
      )}
    </>
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
  width: 550px;

  @media ${device.L} {
    width: 100%;
  }
`

const Item = styled(Accordion.Item)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LectureTypeIcon = styled.span`
  flex-shrink: 0;
`

const StyledText = styled(Text)``

const PreviewText = styled(Text)`
  text-transform: uppercase;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: var(--color-accent);
  color: var(--color-primary);
`

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

const AccordionContentWrapper = styled(Flex)<{clickable: boolean}>`
  padding: 0 4px;

  &:hover {
    cursor: ${(props) => props.clickable && 'pointer'};
    color: ${(props) => props.clickable && 'var(--color-accent)'};

    ${StyledText} {
      color: ${(props) => props.clickable && 'var(--color-accent)'};
    }
  }

  svg {
    color: var(--color-secondary);
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

export default CourseContent
