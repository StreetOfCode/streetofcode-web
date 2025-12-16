import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineThunderbolt,
  AiOutlineAim,
  AiOutlineRocket,
} from 'react-icons/ai'
import {CourseOverview} from '../../../types'
import {device} from '../../../theme/device'
import {routes} from '../../../routes'
import * as Utils from '../../../utils'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import Avatar from '../../core/Avatar'
import Rating from '../../core/Rating'
import Button from '../../core/Button'
import AnimatedCodeEditor from './AnimatedCodeEditor'
import AiCTAButton from './AiCTAButton'
import {
  Section,
  Container,
  GradientText,
  AnimatedElement,
  GradientOverlay,
  FeatureIconWrapper,
} from './styles'
import {useRouter} from 'next/router'

interface HeroSectionProps {
  courseOverview: CourseOverview
  lecturesCount: number
}

const HeroSection: React.FC<HeroSectionProps> = ({
  courseOverview,
  lecturesCount,
}) => {
  const courseDuration = Utils.formatDurationFromMinutes(
    courseOverview.courseDurationMinutes,
  )
  const router = useRouter()
  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <HeroWrapper>
      <GradientOverlay />
      <Container>
        <HeroGrid>
          <HeroContent>
            <AnimatedElement delay={0}>
              <Heading variant="h1">
                Profesionálne
                <br />
                <GradientText>programovanie s AI</GradientText>
              </Heading>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Subtitle>{courseOverview.shortDescription}</Subtitle>
            </AnimatedElement>

            <ValueProps>
              <AnimatedElement delay={200}>
                <ValueProp>
                  <FeatureIconWrapper bgColor="rgba(126, 80, 230, 0.1)">
                    <AiOutlineThunderbolt />
                  </FeatureIconWrapper>
                  <Text size="large">Programuj 2x rýchlejšie</Text>
                </ValueProp>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <ValueProp>
                  <FeatureIconWrapper bgColor="rgba(79, 143, 239, 0.1)">
                    <AiOutlineAim style={{color: '#4F8FEF'}} />
                  </FeatureIconWrapper>
                  <Text size="large">Od základov po pokročilé techniky</Text>
                </ValueProp>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <ValueProp>
                  <FeatureIconWrapper bgColor="rgba(0, 184, 212, 0.1)">
                    <AiOutlineRocket style={{color: '#00B8D4'}} />
                  </FeatureIconWrapper>
                  <Text size="large">Praktické projekty v JS/TS, C#, Java</Text>
                </ValueProp>
              </AnimatedElement>
            </ValueProps>

            <AnimatedElement delay={500}>
              <SocialProof>
                <RatingWrapper>
                  <Rating
                    readOnly
                    value={courseOverview.reviewsOverview.averageRating}
                  />
                </RatingWrapper>
                <Text color="inherit">
                  {lecturesCount} {Utils.numOfLecturesText(lecturesCount)} |{' '}
                  {courseDuration}
                </Text>
                <AuthorInfo
                  onClick={() =>
                    router.push(routes.lektor.slug(courseOverview.author.slug))
                  }
                >
                  <Avatar
                    altName={courseOverview.author.name}
                    src={courseOverview.author.imageUrl}
                    sizePx={32}
                  />
                  <Text size="small">{courseOverview.author.name}</Text>
                </AuthorInfo>
              </SocialProof>
            </AnimatedElement>

            <AnimatedElement delay={600}>
              <CTAButtons>
                <AiCTAButton courseOverview={courseOverview} variant="hero" />
                <Button
                  variant="outline"
                  size="large"
                  onClick={scrollToContent}
                >
                  Pozrieť obsah
                </Button>
              </CTAButtons>
            </AnimatedElement>
          </HeroContent>

          <EditorWrapper>
            <AnimatedCodeEditor />
          </EditorWrapper>
        </HeroGrid>
      </Container>
    </HeroWrapper>
  )
}

const HeroWrapper = styled(Section)`
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  @media ${device.S} {
    min-height: auto;
    padding-top: 24px;
  }
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media ${device.M} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${device.M} {
    order: 2;
  }
`

const EditorWrapper = styled.div`
  @media ${device.M} {
    order: 1;
  }
`

const Subtitle = styled.p`
  font-size: 20px;
  color: var(--color-grey);
  line-height: 1.5;

  @media ${device.S} {
    font-size: 18px;
  }
`

const ValueProps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`

const ValueProp = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SocialProof = styled(Flex)`
  gap: 24px;
  flex-wrap: wrap;
  color: var(--color-grey);
  margin-top: 8px;

  @media ${device.S} {
    gap: 16px;
  }
`

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;

  @media ${device.S} {
    flex-direction: column;
  }
`

export default HeroSection
