import React from 'react'
import styled from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {
  AiOutlineDown,
  AiOutlinePlayCircle,
  AiOutlineFileText,
} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {CourseOverview, LectureType} from '../../../types'

const SectionWrapper = styled.section`
  padding: 80px 0;
  position: relative;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

const StatsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`

const StatItem = styled.div`
  text-align: center;
`

const AccordionWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const StyledAccordion = styled(Accordion.Root)`
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
    background: linear-gradient(135deg, var(--color-accent), #4169e1, #00ced1);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  background: var(--color-primary);
  position: relative;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`

const TriggerContent = styled.div`
  flex: 1;
  text-align: left;
`

const TriggerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const TriggerMeta = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const ChevronIcon = styled(AiOutlineDown)`
  transition: transform 0.3s ease;
  color: var(--color-accent);
  flex-shrink: 0;
`

const AccordionContent = styled(Accordion.Content)`
  overflow: hidden;
  background: var(--color-primary);
  position: relative;

  &[data-state='open'] {
    animation: slideDown 0.3s ease;
  }

  &[data-state='closed'] {
    animation: slideUp 0.3s ease;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`

const ContentInner = styled.div`
  padding: 0 24px 24px 24px;
  position: relative;
`

const LecturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LectureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: var(--color-primary);
  opacity: 0.9;

  svg {
    color: var(--color-accent);
    flex-shrink: 0;
  }
`

const LectureInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

interface CourseContentSectionProps {
  courseOverview: CourseOverview
}

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}

const formatLectureDuration = (seconds: number | null): string => {
  if (!seconds) return ''
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (minutes === 0) {
    return `${secs}s`
  }
  return secs > 0
    ? `${minutes}:${secs.toString().padStart(2, '0')}`
    : `${minutes}min`
}

const getLectureIcon = (type: LectureType) => {
  switch (type) {
    case 'VIDEO':
      return <AiOutlinePlayCircle size={20} />
    case 'TEXT':
      return <AiOutlineFileText size={20} />
    case 'QUIZ':
      return <AiOutlineFileText size={20} />
    default:
      return <AiOutlinePlayCircle size={20} />
  }
}

export const CourseContentSection: React.FC<CourseContentSectionProps> = ({
  courseOverview,
}) => {
  const totalLectures = courseOverview.chapters.reduce(
    (sum, chapter) => sum + chapter.lectures.length,
    0,
  )
  const totalDuration = courseOverview.courseDurationMinutes

  return (
    <SectionWrapper id="content">
      <Container>
        <SectionHeader>
          <Heading variant="h2">Čo kurz obsahuje?</Heading>
          <Text size="large" color="secondary">
            Komplexný prehľad všetkých lekcií a tém
          </Text>
        </SectionHeader>

        <StatsWrapper>
          <StatItem>
            <Heading variant="h3">{courseOverview.chapters.length}</Heading>
            <Text color="secondary">Kapitol</Text>
          </StatItem>
          <StatItem>
            <Heading variant="h3">{totalLectures}</Heading>
            <Text color="secondary">Lekcií</Text>
          </StatItem>
          <StatItem>
            <Heading variant="h3">{formatDuration(totalDuration)}</Heading>
            <Text color="secondary">Video obsahu</Text>
          </StatItem>
        </StatsWrapper>

        <AccordionWrapper>
          <StyledAccordion type="single" collapsible>
            {courseOverview.chapters.map((chapter) => (
              <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                <AccordionTrigger>
                  <TriggerContent>
                    <TriggerTitle>
                      <Heading variant="h4">{chapter.name}</Heading>
                    </TriggerTitle>
                    <TriggerMeta>
                      <Text size="small" color="secondary">
                        {chapter.lectures.length} lekcií
                      </Text>
                      <Text size="small" color="secondary">
                        {formatDuration(chapter.chapterDurationMinutes)}
                      </Text>
                    </TriggerMeta>
                  </TriggerContent>
                  <ChevronIcon />
                </AccordionTrigger>
                <AccordionContent>
                  <ContentInner>
                    <LecturesList>
                      {chapter.lectures.map((lecture) => (
                        <LectureItem key={lecture.id}>
                          {getLectureIcon(lecture.lectureType)}
                          <LectureInfo>
                            <Text size="small">{lecture.name}</Text>
                            {lecture.videoDurationSeconds && (
                              <Text size="small" color="secondary">
                                {formatLectureDuration(
                                  lecture.videoDurationSeconds,
                                )}
                              </Text>
                            )}
                          </LectureInfo>
                        </LectureItem>
                      ))}
                    </LecturesList>
                  </ContentInner>
                </AccordionContent>
              </AccordionItem>
            ))}
          </StyledAccordion>
        </AccordionWrapper>
      </Container>
    </SectionWrapper>
  )
}
