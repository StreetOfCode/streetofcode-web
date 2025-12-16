import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineBook,
  AiOutlineBug,
  AiOutlineThunderbolt,
  AiOutlineRobot,
  AiOutlineSmile,
} from 'react-icons/ai'
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

const withoutAIItems = [
  {
    icon: AiOutlineClockCircle,
    title: '8 hodín na feature',
    description: 'Pomalý development cyklus',
  },
  {
    icon: AiOutlineBook,
    title: 'Stack Overflow hunting',
    description: 'Manuálne hľadanie riešení',
  },
  {
    icon: AiOutlineBug,
    title: 'Debugging hell',
    description: 'ťažké hľadanie bugov',
  },
  {
    icon: AiOutlineBook,
    title: 'Čitanie dokumentácie',
    description: 'Časovo náročné štúdium',
  },
  {
    icon: AiOutlineClockCircle,
    title: 'Opakujúca sa práca',
    description: 'Manuálne písanie boilerplate',
  },
]

const withAIItems = [
  {
    icon: AiOutlineThunderbolt,
    title: '4 hodiny na feature',
    description: '2x rýchlejší development',
    color: 'var(--color-accent)',
  },
  {
    icon: AiOutlineRobot,
    title: 'Asistent priamo v IDE',
    description: 'Okamžité odpovede',
    color: '#4F8FEF',
  },
  {
    icon: AiOutlineCheck,
    title: 'AI Code review',
    description: 'Automaticka detekcia chyb',
    color: '#00B8D4',
  },
  {
    icon: AiOutlineThunderbolt,
    title: 'Instant suggestions',
    description: 'Inteligentne autocomplete',
    color: 'var(--color-accent)',
  },
  {
    icon: AiOutlineSmile,
    title: 'Automation',
    description: 'Generovanie boilerplate kodu',
    color: '#4F8FEF',
  },
]

const ComparisonSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>
          <AnimatedElement>
            <Heading variant="h2" align="center">
              Aký je rozdiel?
            </Heading>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Subtitle>Porovnanie tradičného a AI-powered prístupu</Subtitle>
          </AnimatedElement>
        </SectionTitle>

        <CardsGrid>
          <AnimatedElement delay={200}>
            <ComparisonCard>
              <CardHeader>
                <IconCircle variant="danger">
                  <AiOutlineClose />
                </IconCircle>
                <Heading variant="h4">Bez AI nástrojov</Heading>
              </CardHeader>

              <ItemsList>
                {withoutAIItems.map((item, index) => (
                  <Item key={index}>
                    <item.icon />
                    <ItemContent>
                      <Text weight="bold">{item.title}</Text>
                      <Text size="small" color="inherit">
                        {item.description}
                      </Text>
                    </ItemContent>
                  </Item>
                ))}
              </ItemsList>
            </ComparisonCard>
          </AnimatedElement>

          <AnimatedElement delay={400}>
            <ComparisonCard highlight>
              <GlowEffect />
              <CardHeader>
                <IconCircle variant="success">
                  <AiOutlineCheck />
                </IconCircle>
                <Heading variant="h4">S AI nástrojmi</Heading>
              </CardHeader>

              <ItemsList>
                {withAIItems.map((item, index) => (
                  <Item key={index}>
                    <item.icon style={{color: item.color}} />
                    <ItemContent>
                      <Text weight="bold" style={{color: item.color}}>
                        {item.title}
                      </Text>
                      <Text size="small" color="inherit">
                        {item.description}
                      </Text>
                    </ItemContent>
                  </Item>
                ))}
              </ItemsList>
            </ComparisonCard>
          </AnimatedElement>
        </CardsGrid>
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;

  @media ${device.M} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const ComparisonCard = styled(GradientBorderCard)<{highlight?: boolean}>`
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 128px;
  height: 128px;
  background: radial-gradient(
    circle,
    rgba(126, 80, 230, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(30px);
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
`

const IconCircle = styled.div<{variant: 'danger' | 'success'}>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.variant === 'danger'
      ? 'rgba(203, 32, 65, 0.1)'
      : 'rgba(126, 80, 230, 0.1)'};

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) =>
      props.variant === 'danger'
        ? 'var(--color-danger)'
        : 'var(--color-accent)'};
  }
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  > svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
    color: var(--color-grey);
    margin-top: 4px;
  }
`

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--color-grey);
`

export default ComparisonSection
