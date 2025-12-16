import React from 'react'
import styled, {keyframes} from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {BiChevronDown} from 'react-icons/bi'
import {device} from '../../../theme/device'
import Heading from '../../core/Heading'
import {Section, Container, SectionTitle, AnimatedElement} from './styles'

const faqs = [
  {
    question: 'Pre koho je kurz určený?',
    answer:
      'Kurz je určený pre programátorov, ktorí už majú základné programovacie skúsenosti. ' +
      'Nemusíš byť senior, ale mal/a by si vedieť pracovať vo svojom IDE ' +
      '(VSCode, Visual Studio, IntelliJ IDEA alebo podobné), ' +
      'rozumieť základom Git a GitHub a orientovať sa v kóde svojho hlavného programovacieho jazyka.',
  },
  {
    question: 'Co všetko získáš?',
    answer:
      'Po zakúpení kurzu získáš prístup ku všetkým videám a materiálom. ' +
      'Každý študent si ide vlastným tempom a pozerá videá kedy chce, v akom poradí chce.',
  },
  {
    question: 'Máme záujem o firemné školenie',
    answer:
      'Ak máš záujem o firemné školenie, kontaktuj nás na info@streetofcode.sk. ' +
      'Pripravím vám ponuku do mailu pre školenie vo vašich priestoroch.',
  },
  {
    question: 'Ako dlho budem mať prístup ku kurzu?',
    answer: 'Po zakúpení kurzu budeš mať prístup ku všetkým materiálom navždy.',
  },
  {
    question: 'Ako môžem platit?',
    answer:
      'Platbu môžeš vykonať platobnou kartou. Po platbe získáš prístup ku kurzu ihneď. ' +
      'Kurz bude spárovaný s tvojím účtom na stránke. ' +
      'Ak máš záujem o inú formu platby, alebo platbu na faktúru, kontaktuj nás na info@streetofcode.sk',
  },
]

const FAQSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>
          <AnimatedElement>
            <Heading variant="h2" align="center">
              Časté otázky
            </Heading>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Subtitle>Odpovede na najčastejšie otázky</Subtitle>
          </AnimatedElement>
        </SectionTitle>

        <AnimatedElement delay={200}>
          <FAQWrapper>
            <AccordionRoot type="single" collapsible defaultValue="item-0">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionHeader>
                    <AccordionTrigger>
                      <QuestionText>
                        <span role="img" aria-label="question">
                          ❓
                        </span>{' '}
                        {faq.question}
                      </QuestionText>
                      <ChevronIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AnswerText>{faq.answer}</AnswerText>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </FAQWrapper>
        </AnimatedElement>
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

const FAQWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const AccordionRoot = styled(Accordion.Root)`
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
    background: linear-gradient(135deg, var(--color-accent), #4f8fef, #00b8d4);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

const AccordionHeader = styled(Accordion.Header)`
  margin: 0;
`

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(126, 80, 230, 0.05);
  }

  @media ${device.S} {
    padding: 16px;
  }
`

const QuestionText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${device.S} {
    font-size: 16px;
  }
`

const ChevronIcon = styled(BiChevronDown)`
  width: 24px;
  height: 24px;
  color: var(--color-secondary);
  transition: transform 0.3s ease-out;
  flex-shrink: 0;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`

const openContentAnimation = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
`

const closeContentAnimation = keyframes`
  from {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
`

const AccordionContent = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state='open'] {
    animation: ${openContentAnimation} 0.3s ease-out forwards;
  }

  &[data-state='closed'] {
    animation: ${closeContentAnimation} 0.3s ease-out forwards;
  }
`

const AnswerText = styled.p`
  padding: 0 24px 20px;
  color: var(--color-grey);
  line-height: 1.6;

  @media ${device.S} {
    padding: 0 16px 16px;
  }
`

export default FAQSection
