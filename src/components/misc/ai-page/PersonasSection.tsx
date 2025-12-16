import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheck} from 'react-icons/ai'
import {IoSchoolOutline} from 'react-icons/io5'
import {BiBriefcase} from 'react-icons/bi'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {device} from '../../../theme/device'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {
  Section,
  Container,
  SectionTitle,
  GradientBorderCard,
  AnimatedElement,
} from './styles'

const personas = [
  {
    icon: IoSchoolOutline,
    title: 'Junior Developer',
    quote: 'Chcem byť efektívnejší',
    iconColor: '#4CBF6B',
    requirements: ['Základy Git', 'Znalosti IDE', 'Jeden jazyk (JS/C#/Java)'],
  },
  {
    icon: BiBriefcase,
    title: 'Senior Developer',
    quote: 'Držať krok s AI',
    iconColor: '#4F8FEF',
    requirements: [
      'Zvýšiť produktivitu',
      'Zostať konkurencieschopný',
      'Vedieť využiť AI nástroje',
    ],
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Tech Lead',
    quote: 'Zvýšiť produktivitu tímu',
    iconColor: 'var(--color-accent)',
    requirements: [
      'Implementovať AI v tíme',
      'Best practices',
      'Školenie členov tímu',
    ],
  },
]

const PersonasSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>
          <AnimatedElement>
            <Heading variant="h2" align="center">
              Je tento kurz pre teba?
            </Heading>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Subtitle>Kurz je vhodný pre rozne úrovne vývojárov</Subtitle>
          </AnimatedElement>
        </SectionTitle>

        <PersonasGrid>
          {personas.map((persona, index) => (
            <AnimatedElement key={persona.title} delay={200 + index * 150}>
              <PersonaCard>
                <IconWrapper style={{borderColor: persona.iconColor}}>
                  <persona.icon style={{color: persona.iconColor}} />
                </IconWrapper>

                <Heading variant="h4" align="center">
                  {persona.title}
                </Heading>

                <Quote>"{persona.quote}"</Quote>

                <RequirementsSection>
                  <Text size="small" weight="bold" align="center">
                    Potrebuješ:
                  </Text>
                  <RequirementsList>
                    {persona.requirements.map((req) => (
                      <Requirement key={req}>
                        <CheckIcon />
                        <Text size="small" color="inherit">
                          {req}
                        </Text>
                      </Requirement>
                    ))}
                  </RequirementsList>
                </RequirementsSection>
              </PersonaCard>
            </AnimatedElement>
          ))}
        </PersonasGrid>
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

const PersonasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.S} {
    grid-template-columns: 1fr;
  }
`

const PersonaCard = styled(GradientBorderCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  transition: transform 0.3s ease-out;
  height: 100%;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: var(--color-primary);
  border: 2px solid var(--color-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out;

  svg {
    width: 40px;
    height: 40px;
  }

  ${PersonaCard}:hover & {
    transform: scale(1.1);
  }
`

const Quote = styled.p`
  font-size: 18px;
  color: var(--color-grey);
  font-style: italic;
`

const RequirementsSection = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const RequirementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Requirement = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  color: var(--color-grey);
`

const CheckIcon = styled(AiOutlineCheck)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  color: var(--color-accent);
  margin-top: 2px;
`

export default PersonasSection
