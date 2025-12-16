import React from 'react'
import styled from 'styled-components'
import {AiOutlineGithub, AiOutlineCode, AiOutlineStar} from 'react-icons/ai'
import {device} from '../../../theme/device'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {
  Section,
  Container,
  SectionTitle,
  GradientBorderCard,
  AnimatedElement,
  Badge,
  BulletPoint,
} from './styles'

const tools = [
  {
    name: 'GitHub Copilot',
    icon: AiOutlineGithub,
    description: 'Tvoj AI párový programátor priamo v editore',
    level: 'Začiatočník',
    levelColor: '#4CBF6B',
    features: [
      'Autocomplete kódu',
      'Generovanie funkcií',
      'Code suggestions',
      'Dokumentácia kódu',
    ],
    gradient: 'from-green-500/20 to-blue-500/20',
  },
  {
    name: 'Cursor IDE',
    icon: AiOutlineCode,
    description: 'Ultimátne AI IDE pre moderných vývojárov',
    level: 'Pokročilý',
    levelColor: '#4F8FEF',
    features: [
      'Agentové programovanie',
      'Multi-file editing',
      'AI refactoring',
      'MCP servery',
    ],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    name: 'Claude Code',
    icon: AiOutlineStar,
    description: 'Najvýkonnejší AI asistent pre komplexné úlohy',
    level: 'Expert',
    levelColor: 'var(--color-accent)',
    features: [
      'Komplexné projekty',
      'Architektonické rozhodnutia',
      'AI Code review',
      'Best practices',
    ],
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
]

const ToolsSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>
          <AnimatedElement>
            <Heading variant="h2" align="center">
              Čo sa naučíš ovládať?
            </Heading>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Subtitle>
              Praktické ovládanie top AI nástrojov pre programátorov
            </Subtitle>
          </AnimatedElement>
        </SectionTitle>

        <ToolsGrid>
          {tools.map((tool, index) => (
            <AnimatedElement key={tool.name} delay={200 + index * 150}>
              <ToolCard>
                <ToolHeader>
                  <IconWrapper>
                    <tool.icon />
                  </IconWrapper>
                  <Heading variant="h4">{tool.name}</Heading>
                  <Badge bgColor={tool.levelColor}>{tool.level}</Badge>
                </ToolHeader>

                <Text color="inherit">{tool.description}</Text>

                <FeaturesSection>
                  <Text size="small" weight="bold">
                    Čo rieši:
                  </Text>
                  <FeaturesList>
                    {tool.features.map((feature) => (
                      <Feature key={feature}>
                        <BulletPoint />
                        <Text size="small" color="inherit">
                          {feature}
                        </Text>
                      </Feature>
                    ))}
                  </FeaturesList>
                </FeaturesSection>
              </ToolCard>
            </AnimatedElement>
          ))}
        </ToolsGrid>
      </Container>
    </Section>
  )
}

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--color-grey);
  text-align: center;
  margin-top: 16px;
`

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.S} {
    grid-template-columns: 1fr;
  }
`

const ToolCard = styled(GradientBorderCard)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s ease-out;
  color: var(--color-grey);
  height: 100%;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`

const ToolHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--color-primary);
  border: 1px solid var(--color-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out;

  svg {
    width: 28px;
    height: 28px;
    color: var(--color-accent);
  }

  ${ToolCard}:hover & {
    transform: scale(1.1);
  }
`

const FeaturesSection = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export default ToolsSection
