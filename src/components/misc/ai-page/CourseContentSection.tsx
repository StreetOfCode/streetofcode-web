import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {BiChevronDown} from 'react-icons/bi'
import {CourseOverview, LectureOverview} from '../../../types'
import {device} from '../../../theme/device'
import * as Utils from '../../../utils'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import {useAuth} from '../../../AuthUserContext'
import LecturePreview from '../../domain/lecture/LecturePreview'
import {
  Section,
  Container,
  SectionTitle,
  AnimatedElement,
  ProgressBar,
  ProgressBarFill,
  BulletPoint,
} from './styles'

interface CourseContentSectionProps {
  courseOverview: CourseOverview
}

const CourseContentSection: React.FC<CourseContentSectionProps> = ({
  courseOverview,
}) => {
  const {user} = useAuth()
  const [previewLectureInModal, setPreviewLectureInModal] =
    useState<LectureOverview | null>(null)

  const {chapters, courseDurationMinutes} = courseOverview
  const lecturesCount = chapters.flatMap((chapter) => chapter.lectures).length
  const formattedDuration = Utils.formatDurationFromMinutes(
    courseDurationMinutes,
  )

  const states = Utils.getCourseProductStates(courseOverview, user)

  const isLectureClickable = (lecture: LectureOverview) => {
    if (
      states.hasNoActiveProductsAndIsLoggedIn ||
      states.hasActiveProductsAndIsOwnedByUser
    )
      return true

    const allowPreviewWhenPaid = lecture.allowPreviewWhenPaid
    if (allowPreviewWhenPaid && states.hasActiveProductsButIsNotOwnedByUser)
      return true

    return false
  }

  const shouldPreviewLectureForPaidCourse = (lecture: LectureOverview) => {
    return (
      isLectureClickable(lecture) && states.hasActiveProductsButIsNotOwnedByUser
    )
  }

  const handleLectureOnClick = (
    e: React.MouseEvent,
    lecture: LectureOverview,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    if (shouldPreviewLectureForPaidCourse(lecture)) {
      setPreviewLectureInModal(lecture)
    }
  }

  return (
    <>
      <Section id="content">
        <Container>
          <SectionTitle>
            <AnimatedElement>
              <Heading variant="h2" align="center">
                Čo kurz obsahuje?
              </Heading>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <Subtitle>
                Kompletný obsah kurzu rozdelený do {chapters.length} sekcií
              </Subtitle>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <ProgressInfo>
                <Flex justifyContent="space-between" alignSelf="stretch">
                  <Text size="small" color="inherit">
                    Celková dĺžka: {formattedDuration}
                  </Text>
                  <Text size="small" color="inherit">
                    {lecturesCount} {Utils.numOfLecturesText(lecturesCount)}
                  </Text>
                </Flex>
                <ProgressBar>
                  <ProgressBarFill width="0%" />
                </ProgressBar>
              </ProgressInfo>
            </AnimatedElement>
          </SectionTitle>

          <AnimatedElement delay={300}>
            <AccordionWrapper>
              <AccordionRoot
                type="multiple"
                defaultValue={[chapters[0]?.id.toString()]}
              >
                {chapters.map((chapter) => {
                  const chapterLectureCount = chapter.lectures.length
                  return (
                    <AccordionItem
                      key={chapter.id}
                      value={chapter.id.toString()}
                    >
                      <AccordionHeader>
                        <AccordionTrigger>
                          <TriggerContent>
                            <ChapterIcon>
                              {Utils.getLectureTypeIcon(
                                chapter.lectures[0]?.lectureType || 'VIDEO',
                              )}
                            </ChapterIcon>
                            <ChapterInfo>
                              <ChapterTitle>{chapter.name}</ChapterTitle>
                              <ChapterMeta>
                                {chapterLectureCount}{' '}
                                {Utils.numOfLecturesText(chapterLectureCount)} |{' '}
                                {chapter.chapterDurationMinutes}{' '}
                                {Utils.numOfMinutesText(
                                  chapter.chapterDurationMinutes,
                                )}
                              </ChapterMeta>
                            </ChapterInfo>
                          </TriggerContent>
                          <ChevronIcon />
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent>
                        <ContentInner>
                          <LecturesList>
                            {chapter.lectures.map((lecture) => (
                              <LectureItem
                                key={lecture.id}
                                clickable={shouldPreviewLectureForPaidCourse(
                                  lecture,
                                )}
                                onClick={(e) =>
                                  handleLectureOnClick(e, lecture)
                                }
                              >
                                <BulletPoint />
                                <LectureText size="small">
                                  {lecture.name}
                                </LectureText>
                                <LectureMetaWrapper>
                                  {lecture.videoDurationSeconds > 0 && (
                                    <LectureDuration>
                                      {Utils.formatDurationFromSeconds(
                                        lecture.videoDurationSeconds,
                                      )}
                                    </LectureDuration>
                                  )}
                                  {shouldPreviewLectureForPaidCourse(
                                    lecture,
                                  ) && <PreviewBadge>náhľad</PreviewBadge>}
                                </LectureMetaWrapper>
                              </LectureItem>
                            ))}
                          </LecturesList>
                        </ContentInner>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </AccordionRoot>
            </AccordionWrapper>
          </AnimatedElement>
        </Container>
      </Section>
      {previewLectureInModal && (
        <LecturePreview
          lecture={previewLectureInModal}
          onClosePreview={() => setPreviewLectureInModal(null)}
        />
      )}
    </>
  )
}

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--color-grey);
  text-align: center;
  margin-top: 16px;
`

const ProgressInfo = styled.div`
  max-width: 600px;
  margin: 32px auto 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--color-grey);
`

const AccordionWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const AccordionRoot = styled(Accordion.Root)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AccordionItem = styled(Accordion.Item)`
  position: relative;
  background: var(--color-primary);
  border-radius: 12px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-accent), #4f8fef, #00b8d4);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

const AccordionHeader = styled(Accordion.Header)`
  margin: 0;
`

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;

  &:hover {
    background: rgba(126, 80, 230, 0.05);
  }

  @media ${device.S} {
    padding: 16px;
  }
`

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const ChapterIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(126, 80, 230, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out;

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-accent);
  }

  ${AccordionTrigger}:hover & {
    transform: scale(1.1);
  }

  @media ${device.S} {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const ChapterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ChapterTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-secondary);

  @media ${device.S} {
    font-size: 16px;
  }
`

const ChapterMeta = styled.span`
  font-size: 14px;
  color: var(--color-grey);
`

const ChevronIcon = styled(BiChevronDown)`
  width: 24px;
  height: 24px;
  color: var(--color-secondary);
  transition: transform 0.3s ease-out;
  flex-shrink: 0;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`

const openContentAnimation = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
`

const closeContentAnimation = keyframes`
  from {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
`

const AccordionContent = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state='open'] {
    animation: ${openContentAnimation} 0.3s ease-out forwards;
  }

  &[data-state='closed'] {
    animation: ${closeContentAnimation} 0.3s ease-out forwards;
  }
`

const ContentInner = styled.div`
  padding: 0 24px 20px;

  @media ${device.S} {
    padding: 0 16px 16px;
  }
`

const LecturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LectureText = styled(Text)``

const LectureItem = styled.div<{clickable: boolean}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-shadow);
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    ${(props) =>
      props.clickable &&
      `
      color: var(--color-accent);

      ${LectureText} {
        color: var(--color-accent);
      }
    `}
  }
`

const LectureMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

const LectureDuration = styled.span`
  font-size: 12px;
  color: var(--color-grey);
`

const PreviewBadge = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
`

export default CourseContentSection
