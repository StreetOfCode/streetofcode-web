import React from 'react'
import styled from 'styled-components'
import {AiOutlineMail} from 'react-icons/ai'
import {CourseOverview} from '../../../types'
import {device} from '../../../theme/device'
import Heading from '../../core/Heading'
import AiCTAButton from './AiCTAButton'
import {
  Section,
  Container,
  AnimatedElement,
  GradientText,
  GradientOverlay,
} from './styles'

interface FinalCTAProps {
  courseOverview: CourseOverview
}

const FinalCTA: React.FC<FinalCTAProps> = ({courseOverview}) => {
  return (
    <CTASection>
      <GradientOverlay />
      <RadialGlow />
      <Container>
        <AnimatedElement>
          <Content>
            <Heading variant="h2" align="center">
              Pripravený stať sa
              <br />
              <GradientText>produktivným?</GradientText>
            </Heading>

            <Subtitle>
              Začni programovať s AI nástrojmi ešte dnes a zvýš svoju
              produktivitu o 200%
            </Subtitle>

            <AiCTAButton courseOverview={courseOverview} variant="finalCta" />

            <ContactInfo>
              <AiOutlineMail />
              <span>Máš otázky? Napíš na </span>
              <ContactLink href="mailto:info@streetofcode.sk">
                info@streetofcode.sk
              </ContactLink>
            </ContactInfo>
          </Content>
        </AnimatedElement>
      </Container>
    </CTASection>
  )
}

const CTASection = styled(Section)`
  position: relative;
  overflow: hidden;
`

const RadialGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(126, 80, 230, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
`

const Content = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const Subtitle = styled.p`
  font-size: 20px;
  color: var(--color-grey);
  line-height: 1.5;

  @media ${device.S} {
    font-size: 18px;
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-grey);
  font-size: 14px;
  flex-wrap: wrap;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`

const ContactLink = styled.a`
  color: var(--color-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default FinalCTA
