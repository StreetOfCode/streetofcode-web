import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineUser,
} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import {CourseOverview} from '../../../types'
import {AnimatedCodeEditor} from './AnimatedCodeEditor'
import {device} from '../../../theme/device'
import Button from '../../core/Button'

const SectionWrapper = styled.section`
  padding: 80px 0 40px;
  position: relative;
  overflow: hidden;
`

const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(126, 80, 230, 0.1),
    transparent 70%
  );
  pointer-events: none;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
`

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media ${device.M} {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const GradientText = styled.span`
  background: linear-gradient(135deg, #7e50e6, #4169e1, #00ced1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: var(--color-accent);
    flex-shrink: 0;
  }
`

const CTAWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const StyledButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  min-width: 180px;
`

const SecondaryButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  min-width: 180px;
`

const EditorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-primary);
  border-radius: 12px;
  border: 1px solid var(--color-secondary);
  opacity: 0.1;
`

const AuthorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`

interface HeroSectionProps {
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

export const HeroSection: React.FC<HeroSectionProps> = ({courseOverview}) => {
  const scrollToContent = () => {
    const contentSection = document.getElementById('content')
    if (contentSection) {
      contentSection.scrollIntoView({behavior: 'smooth'})
    }
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <SectionWrapper>
      <BackgroundGradient />
      <Container>
        <HeroContent>
          <TextContent>
            <Heading variant="h1">{courseOverview.name}</Heading>

            <Heading variant="h3" normalWeight>
              Nauč sa programovať <GradientText>3x rýchlejšie</GradientText> s
              AI nástrojmi
            </Heading>

            <Text size="large" color="secondary">
              {courseOverview.shortDescription}
            </Text>

            <MetaInfo>
              {courseOverview.reviewsOverview.numberOfReviews > 0 && (
                <MetaItem>
                  <AiOutlineStar size={20} />
                  <Text weight="bold">
                    {courseOverview.reviewsOverview.averageRating.toFixed(1)}
                  </Text>
                  <Text size="small" color="secondary">
                    ({courseOverview.reviewsOverview.numberOfReviews} hodnotení)
                  </Text>
                </MetaItem>
              )}
              <MetaItem>
                <AiOutlineClockCircle size={20} />
                <Text weight="bold">
                  {formatDuration(courseOverview.courseDurationMinutes)}
                </Text>
                <Text size="small" color="secondary">
                  video obsahu
                </Text>
              </MetaItem>
              <MetaItem>
                <AiOutlineUser size={20} />
                <Text weight="bold">{courseOverview.author.name}</Text>
              </MetaItem>
            </MetaInfo>

            <CTAWrapper>
              <StyledButton variant="accent" onClick={scrollToPricing}>
                Kúpiť kurz
              </StyledButton>
              <SecondaryButton variant="outline" onClick={scrollToContent}>
                Pozrieť obsah
              </SecondaryButton>
            </CTAWrapper>

            <AuthorInfo>
              <AuthorAvatar
                src={courseOverview.author.imageUrl}
                alt={courseOverview.author.name}
              />
              <Flex direction="column" gap="4px">
                <Text weight="bold">{courseOverview.author.name}</Text>
                <Text size="small" color="secondary">
                  {courseOverview.author.coursesTitle || 'Lektor'}
                </Text>
              </Flex>
            </AuthorInfo>
          </TextContent>

          <EditorWrapper>
            <AnimatedCodeEditor />
          </EditorWrapper>
        </HeroContent>
      </Container>
    </SectionWrapper>
  )
}
