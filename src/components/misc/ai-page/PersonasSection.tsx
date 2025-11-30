import React from 'react'
import styled from 'styled-components'
import {AiOutlineRocket, AiOutlineStar, AiOutlineTrophy} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {device} from '../../../theme/device'

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

const PersonasGrid = styled.div`
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

const PersonaCard = styled.div`
  position: relative;
  background: var(--color-primary);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.3s ease;
  text-align: center;

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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(126, 80, 230, 0.1);
  margin: 0 auto 24px;
  position: relative;

  svg {
    width: 40px;
    height: 40px;
    color: var(--color-accent);
  }
`

const PersonaContent = styled.div`
  position: relative;
`

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: var(--color-secondary);
  opacity: 0.8;

  &::before {
    content: '→';
    color: var(--color-accent);
    font-weight: bold;
    flex-shrink: 0;
  }
`

export const PersonasSection: React.FC = () => {
  const personas = [
    {
      icon: <AiOutlineRocket />,
      title: 'Junior Developer',
      description:
        'Začínaš kariéru? AI nástroje ti pomôžu učiť sa rýchlejšie a robiť menej chýb',
      benefits: [
        'Rýchlejšie sa učiť zo vzorových príkladov',
        'Získať okamžitú spätnú väzbu na kód',
        'Spoznať best practices od AI',
        'Zvýšiť sebadôveru pri kódení',
      ],
    },
    {
      icon: <AiOutlineStar />,
      title: 'Senior Developer',
      description:
        'Máš skúsenosti? Využi AI na automatizáciu rutinných úloh a focus na architektúru',
      benefits: [
        'Automatizovať repetitívne úlohy',
        'Rýchlejšie prototipovať riešenia',
        'Efektívnejší code review',
        'Viac času na dôležité rozhodnutia',
      ],
    },
    {
      icon: <AiOutlineTrophy />,
      title: 'Tech Lead',
      description:
        'Vedieš tím? AI ti pomôže pri code review, mentoringu a zvýšení produktivity celého tímu',
      benefits: [
        'Zlepšiť kvalitu kódu v tíme',
        'Rýchlejší onboarding nových členov',
        'Konzistentné best practices',
        'Zvýšiť produktivitu tímu o 300%',
      ],
    },
  ]

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Heading variant="h2">Pre koho je kurz určený?</Heading>
          <Text size="large" color="secondary">
            Bez ohľadu na tvoju úroveň, AI nástroje ti pomôžu
          </Text>
        </SectionHeader>

        <PersonasGrid>
          {personas.map((persona, index) => (
            <PersonaCard key={index}>
              <PersonaContent>
                <IconWrapper>{persona.icon}</IconWrapper>
                <Heading variant="h4">{persona.title}</Heading>
                <Text
                  size="small"
                  color="secondary"
                  style={{marginTop: '12px'}}
                >
                  {persona.description}
                </Text>
                <BenefitsList>
                  {persona.benefits.map((benefit, i) => (
                    <BenefitItem key={i}>{benefit}</BenefitItem>
                  ))}
                </BenefitsList>
              </PersonaContent>
            </PersonaCard>
          ))}
        </PersonasGrid>
      </Container>
    </SectionWrapper>
  )
}
