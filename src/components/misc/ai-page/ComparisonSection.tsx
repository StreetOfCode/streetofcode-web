import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineClockCircle,
  AiOutlineBook,
  AiOutlineBug,
  AiOutlineThunderbolt,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai'
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

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ComparisonCard = styled.div<{isPositive?: boolean}>`
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
    background: ${(props) =>
      props.isPositive
        ? 'linear-gradient(135deg, var(--color-accent), #4169E1, #00CED1)'
        : 'linear-gradient(135deg, #666, #999)'};
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  ${(props) =>
    props.isPositive &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 128px;
      height: 128px;
      background: radial-gradient(circle, var(--color-accent), transparent);
      opacity: 0.1;
      border-radius: 50%;
      blur: 48px;
    }
  `}
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
`

const IconWrapper = styled.div<{isPositive?: boolean}>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isPositive ? 'rgba(126, 80, 230, 0.1)' : 'rgba(239, 68, 68, 0.1)'};

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.isPositive ? 'var(--color-accent)' : '#ef4444')};
  }
`

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0.6;
  }
`

const FeatureContent = styled.div`
  flex: 1;
`

export const ComparisonSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Heading variant="h2">Aký je rozdiel?</Heading>
          <Text size="large" color="secondary">
            Porovnanie tradičného a AI-powered prístupu
          </Text>
        </SectionHeader>

        <ComparisonGrid>
          {/* Without AI */}
          <ComparisonCard>
            <CardHeader>
              <IconWrapper>
                <AiOutlineClose />
              </IconWrapper>
              <Heading variant="h3">Bez AI nástrojov</Heading>
            </CardHeader>

            <FeatureList>
              <FeatureItem>
                <AiOutlineClockCircle />
                <FeatureContent>
                  <Text weight="bold">8 hodín na feature</Text>
                  <Text size="small" color="secondary">
                    Pomalý development cyklus
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineBook />
                <FeatureContent>
                  <Text weight="bold">Stack Overflow hunting</Text>
                  <Text size="small" color="secondary">
                    Manuálne hľadanie riešení
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineBug />
                <FeatureContent>
                  <Text weight="bold">Debugging hell</Text>
                  <Text size="small" color="secondary">
                    Ťažké hľadanie bugov
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineBook />
                <FeatureContent>
                  <Text weight="bold">Čítanie dokumentácie</Text>
                  <Text size="small" color="secondary">
                    Časovo náročné štúdium
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineClockCircle />
                <FeatureContent>
                  <Text weight="bold">Opakujúca sa práca</Text>
                  <Text size="small" color="secondary">
                    Manuálne písanie boilerplate
                  </Text>
                </FeatureContent>
              </FeatureItem>
            </FeatureList>
          </ComparisonCard>

          {/* With AI */}
          <ComparisonCard isPositive>
            <CardHeader>
              <IconWrapper isPositive>
                <AiOutlineCheck />
              </IconWrapper>
              <Heading variant="h3">S AI nástrojmi</Heading>
            </CardHeader>

            <FeatureList>
              <FeatureItem>
                <AiOutlineThunderbolt />
                <FeatureContent>
                  <Text weight="bold">2 hodiny na feature</Text>
                  <Text size="small" color="secondary">
                    4x rýchlejší vývoj
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineThunderbolt />
                <FeatureContent>
                  <Text weight="bold">AI asistent v IDE</Text>
                  <Text size="small" color="secondary">
                    Okamžité odpovede a riešenia
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineThunderbolt />
                <FeatureContent>
                  <Text weight="bold">Auto code review</Text>
                  <Text size="small" color="secondary">
                    AI kontroluje kvalitu kódu
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineThunderbolt />
                <FeatureContent>
                  <Text weight="bold">Inteligentné návrhy</Text>
                  <Text size="small" color="secondary">
                    Kontextové dopĺňanie kódu
                  </Text>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <AiOutlineThunderbolt />
                <FeatureContent>
                  <Text weight="bold">Auto-generovanie</Text>
                  <Text size="small" color="secondary">
                    Boilerplate kód za sekundy
                  </Text>
                </FeatureContent>
              </FeatureItem>
            </FeatureList>
          </ComparisonCard>
        </ComparisonGrid>
      </Container>
    </SectionWrapper>
  )
}
