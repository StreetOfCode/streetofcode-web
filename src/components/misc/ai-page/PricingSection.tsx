import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheck, AiOutlineLock} from 'react-icons/ai'
import {CourseOverview} from '../../../types'
import {device} from '../../../theme/device'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import AiCTAButton from './AiCTAButton'
import {
  Section,
  Container,
  GradientBorderCard,
  AnimatedElement,
  GradientText,
} from './styles'

interface PricingSectionProps {
  courseOverview: CourseOverview
}

const features = (lecturesCount: number) => [
  `${lecturesCount} video lekcií`,
  'Prístup k VS Code, Visual Studio, IntelliJ setupom',
  'Claude Code kompletný sprievodca',
  'Ultimátny workflow pre komplexné úlohy',
  'Lifetime updates',
  'Prístup do komunity',
]

const PricingSection: React.FC<PricingSectionProps> = ({courseOverview}) => {
  const price = (courseOverview.courseProducts[0]?.price || 0) / 100
  const lecturesCount = courseOverview.chapters.flatMap(
    (chapter) => chapter.lectures,
  ).length
  return (
    <Section>
      <Container>
        <AnimatedElement>
          <PricingCard>
            <GlowTopRight />
            <GlowBottomLeft />

            <CardContent>
              <Header>
                <Heading variant="h3" align="center">
                  🎯 Chcem sa naučiť ovládať AI nástroje
                </Heading>
                <PriceWrapper>
                  <GradientText>
                    <Price>{price} EUR</Price>
                  </GradientText>
                </PriceWrapper>
              </Header>

              <AiCTAButton
                courseOverview={courseOverview}
                variant="pricing"
                showPrice={false}
              />

              <Description>{courseOverview.shortDescription}</Description>

              <FeaturesList>
                {features(lecturesCount).map((feature) => (
                  <Feature key={feature}>
                    <CheckCircle>
                      <AiOutlineCheck />
                    </CheckCircle>
                    <Text size="large">{feature}</Text>
                  </Feature>
                ))}
              </FeaturesList>

              <TrustBadges>
                <TrustBadge>
                  <AiOutlineLock />
                  <span>Bezpečná platba</span>
                </TrustBadge>
              </TrustBadges>
            </CardContent>
          </PricingCard>
        </AnimatedElement>
      </Container>
    </Section>
  )
}

const PricingCard = styled(GradientBorderCard)`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding: 48px;

  @media ${device.S} {
    padding: 32px 24px;
  }
`

const GlowTopRight = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(126, 80, 230, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
`

const GlowBottomLeft = styled.div`
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(0, 184, 212, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
`

const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Header = styled.div`
  text-align: center;
`

const PriceWrapper = styled.div`
  margin-top: 16px;
`

const Price = styled.span`
  font-size: 64px;
  font-weight: 700;
  line-height: 1.2;

  @media ${device.S} {
    font-size: 48px;
  }
`

const Description = styled.p`
  text-align: center;
  font-size: 18px;
  color: var(--color-grey);
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-shadow);
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-shadow);
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(126, 80, 230, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    color: var(--color-accent);
  }
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-grey);
  font-size: 14px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-accent);
  }
`

export default PricingSection
