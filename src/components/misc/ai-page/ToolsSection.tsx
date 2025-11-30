import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineGithub,
  AiOutlineCode,
  AiOutlineThunderbolt,
} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {device} from '../../../theme/device'

const SectionWrapper = styled.section`
  padding: 80px 0;
  position: relative;
  background: var(--color-primary);
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

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media ${device.S} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.L} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ToolCard = styled.div`
  position: relative;
  background: var(--color-primary);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-accent), #4169e1, #00ced1);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(126, 80, 230, 0.1);
  margin-bottom: 24px;
  position: relative;

  svg {
    width: 32px;
    height: 32px;
    color: var(--color-accent);
  }
`

const ToolContent = styled.div`
  position: relative;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: var(--color-secondary);
  opacity: 0.8;

  &::before {
    content: '✓';
    color: var(--color-accent);
    font-weight: bold;
    flex-shrink: 0;
  }
`

export const ToolsSection: React.FC = () => {
  const tools = [
    {
      icon: <AiOutlineGithub />,
      name: 'GitHub Copilot',
      description:
        'AI asistent priamo v editore, ktorý ti pomáha písať kód rýchlejšie s inteligentnými návrhmi',
      features: [
        'Automatické dopĺňanie kódu',
        'Generovanie celých funkcií',
        'Kontextové návrhy',
        'Podpora všetkých jazykov',
      ],
    },
    {
      icon: <AiOutlineCode />,
      name: 'Cursor IDE',
      description:
        'Pokročilé AI IDE s integrovaným chatom, ktoré rozumie celému tvojmu projektu',
      features: [
        'Chat s celým codebase',
        'Multi-file editing',
        'Composer mode',
        'Inteligentný refactoring',
      ],
    },
    {
      icon: <AiOutlineThunderbolt />,
      name: 'Claude Code',
      description:
        'Mocný AI asistent pre komplexné úlohy, architektúru a code review',
      features: [
        'Expertné code review',
        'Architektonické návrhy',
        'Komplexný refactoring',
        'Best practices',
      ],
    },
  ]

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Heading variant="h2">AI nástroje, ktoré zvládneš</Heading>
          <Text size="large" color="secondary">
            Nauč sa pracovať s troma najpokročilejšími AI nástrojmi
          </Text>
        </SectionHeader>

        <ToolsGrid>
          {tools.map((tool, index) => (
            <ToolCard key={index}>
              <ToolContent>
                <IconWrapper>{tool.icon}</IconWrapper>
                <Heading variant="h4">{tool.name}</Heading>
                <Text
                  size="small"
                  color="secondary"
                  style={{marginTop: '12px'}}
                >
                  {tool.description}
                </Text>
                <FeatureList>
                  {tool.features.map((feature, i) => (
                    <FeatureItem key={i}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
              </ToolContent>
            </ToolCard>
          ))}
        </ToolsGrid>
      </Container>
    </SectionWrapper>
  )
}
