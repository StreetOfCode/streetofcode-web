import React from 'react'
import styled from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import {AiOutlineDown} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'

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

const AccordionWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const StyledAccordion = styled(Accordion.Root)`
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
    background: linear-gradient(135deg, var(--color-accent), #4169e1, #00ced1);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  background: var(--color-primary);
  position: relative;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`

const TriggerContent = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ChevronIcon = styled(AiOutlineDown)`
  transition: transform 0.3s ease;
  color: var(--color-accent);
  flex-shrink: 0;
`

const AccordionContent = styled(Accordion.Content)`
  overflow: hidden;
  background: var(--color-primary);
  position: relative;

  &[data-state='open'] {
    animation: slideDown 0.3s ease;
  }

  &[data-state='closed'] {
    animation: slideUp 0.3s ease;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`

const ContentInner = styled.div`
  padding: 0 24px 24px 24px;
  position: relative;
`

const faqs = [
  {
    question: 'Pre koho je kurz určený?',
    answer:
      'Kurz je určený pre vývojárov na všetkých úrovniach - od juniorov po ' +
      'seniorov a tech leadov. Potrebuješ základné znalosti programovania v ' +
      'aspoň jednom jazyku (JavaScript/TypeScript, C#, Java) a znalosť práce ' +
      's IDE. Kurz ti ukáže, ako využiť AI nástroje na zvýšenie produktivity ' +
      'bez ohľadu na tvoju aktuálnu úroveň.',
  },
  {
    question: 'Čo všetko získam?',
    answer:
      'Získaš prístup k 68 video lekciám (7h 45min celkovo), praktickým ' +
      'projektom v rôznych jazykoch, kompletným setupom pre VS Code, Visual ' +
      'Studio a IntelliJ IDEA, a detailnému sprievodcovi pre GitHub Copilot, ' +
      'Cursor a Claude Code. Súčasťou je aj lifetime prístup k updatom a ' +
      'prístup do komunity.',
  },
  {
    question: 'Máme záujem o firemné školenie',
    answer:
      'Pre firmy ponúkame špeciálne balíčky s hromadnými licenciami, ' +
      'možnosťou customizácie obsahu a priamou podporou. Kontaktujte nás ' +
      'na kontakt@streetofcode.sk pre individuálnu cenovú ponuku a detaily.',
  },
  {
    question: 'Ako dlho budem mať prístup ku kurzu?',
    answer:
      'Máš lifetime prístup ku kurzu! Po zakúpení môžeš kurz študovať ' +
      'vlastným tempom a vrátiť sa k nemu kedykoľvek. Navíc automaticky ' +
      'dostaneš všetky budúce updaty zadarmo.',
  },
  {
    question: 'Ako môžem platiť?',
    answer:
      'Akceptujeme platobné karty (Visa, Mastercard, American Express) cez ' +
      'bezpečnú platobnú bránu. Po úspešnej platbe okamžite získaš prístup ' +
      'ku kurzu. Ponúkame 30-dňovú záruku vrátenia peňazí bez udania dôvodu.',
  },
]

export const FAQSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Heading variant="h2">Časté otázky</Heading>
          <Text size="large" color="secondary">
            Odpovede na najčastejšie otázky
          </Text>
        </SectionHeader>

        <AccordionWrapper>
          <StyledAccordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <TriggerContent>
                    <span>❓</span>
                    <Text weight="bold">{faq.question}</Text>
                  </TriggerContent>
                  <ChevronIcon />
                </AccordionTrigger>
                <AccordionContent>
                  <ContentInner>
                    <Text color="secondary" style={{lineHeight: '1.6'}}>
                      {faq.answer}
                    </Text>
                  </ContentInner>
                </AccordionContent>
              </AccordionItem>
            ))}
          </StyledAccordion>
        </AccordionWrapper>
      </Container>
    </SectionWrapper>
  )
}
