import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheck} from 'react-icons/ai'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {CourseOverview} from '../../../types'
import {routes} from '../../../routes'
import Button from '../../core/Button'
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

const PricingCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  background: var(--color-primary);
  border-radius: 16px;
  padding: 48px;
  text-align: center;

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

  @media ${device.S} {
    padding: 64px;
  }
`

const PriceWrapper = styled.div`
  margin-bottom: 32px;
  position: relative;
`

const Price = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: var(--color-accent);
  margin-bottom: 8px;

  @media ${device.S} {
    font-size: 64px;
  }
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  position: relative;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    color: var(--color-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const CTAButton = styled(Button)`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  margin-top: 32px;
  position: relative;
`

const Guarantee = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: rgba(126, 80, 230, 0.05);
  border-radius: 8px;
  position: relative;
`

const ROISection = styled.div`
  margin-top: 48px;
  padding: 32px;
  background: rgba(126, 80, 230, 0.05);
  border-radius: 12px;
  text-align: center;
  position: relative;
`

const ROIGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;

  @media ${device.S} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ROIItem = styled.div`
  text-align: center;
`

interface PricingSectionProps {
  courseOverview: CourseOverview
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  courseOverview,
}) => {
  const activeProduct = courseOverview.courseProducts.find((p) => !p.archived)
  const price = activeProduct?.price || 0

  const handlePurchase = () => {
    if (activeProduct) {
      window.location.href = routes.checkout.courseProduct(
        courseOverview.slug,
        activeProduct.productId,
      )
    }
  }

  const features = [
    'Lifetime prístup ku kurzu',
    'Všetky budúce updaty zadarmo',
    '68 video lekcií (7h 45min)',
    'Praktické projekty v rôznych jazykoch',
    'Setup pre VS Code, Visual Studio, IntelliJ IDEA',
    'Prístup do komunity',
    'GitHub Copilot, Cursor, Claude Code sprievodca',
    'Certifikát o absolvovaní',
  ]

  return (
    <SectionWrapper id="pricing">
      <Container>
        <SectionHeader>
          <Heading variant="h2">Investuj do svojej budúcnosti</Heading>
          <Text size="large" color="secondary">
            Získaj prístup ku kurzu a všetkým materiálom
          </Text>
        </SectionHeader>

        <PricingCard>
          <PriceWrapper>
            <Heading variant="h4" color="secondary">
              Jednorazová platba
            </Heading>
            <Price>€{price}</Price>
            <Text color="secondary">Bez ďalších poplatkov</Text>
          </PriceWrapper>

          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <AiOutlineCheck size={24} />
                <Text>{feature}</Text>
              </FeatureItem>
            ))}
          </FeaturesList>

          {activeProduct && (
            <CTAButton variant="accent" onClick={handlePurchase}>
              Kúpiť kurz teraz
            </CTAButton>
          )}

          <Guarantee>
            <Text weight="bold" style={{marginBottom: '8px'}}>
              30-dňová záruka vrátenia peňazí
            </Text>
            <Text size="small" color="secondary">
              Ak nebudeš spokojný, vrátime ti peniaze bez otázok
            </Text>
          </Guarantee>

          <ROISection>
            <Heading variant="h4">Návratnosť investície</Heading>
            <Text color="secondary" style={{marginTop: '8px'}}>
              Kurz sa ti vráti už po prvom projekte
            </Text>
            <ROIGrid>
              <ROIItem>
                <Heading variant="h3" color="accent">
                  300%
                </Heading>
                <Text size="small" color="secondary">
                  Zvýšenie produktivity
                </Text>
              </ROIItem>
              <ROIItem>
                <Heading variant="h3" color="accent">
                  10h+
                </Heading>
                <Text size="small" color="secondary">
                  Ušetrené týždenne
                </Text>
              </ROIItem>
              <ROIItem>
                <Heading variant="h3" color="accent">
                  €1000+
                </Heading>
                <Text size="small" color="secondary">
                  Hodnota za rok
                </Text>
              </ROIItem>
            </ROIGrid>
          </ROISection>
        </PricingCard>
      </Container>
    </SectionWrapper>
  )
}
