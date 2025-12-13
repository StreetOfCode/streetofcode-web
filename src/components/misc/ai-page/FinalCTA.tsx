import React from 'react'
import styled from 'styled-components'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {CourseOverview} from '../../../types'
import {routes} from '../../../routes'
import Button from '../../core/Button'

const SectionWrapper = styled.section`
  padding: 80px 0;
  position: relative;
  overflow: hidden;
`

const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(126, 80, 230, 0.1),
    rgba(65, 105, 225, 0.1),
    rgba(0, 206, 209, 0.1)
  );
  pointer-events: none;
`

const RadialGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(139, 92, 246, 0.15),
    transparent
  );
  pointer-events: none;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`

const Content = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`

const GradientText = styled.span`
  background: linear-gradient(135deg, #7e50e6, #4169e1, #00ced1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const CTAButton = styled(Button)`
  padding: 20px 48px;
  font-size: 20px;
  font-weight: 600;
  min-width: 250px;
  position: relative;
  box-shadow: 0 8px 24px rgba(126, 80, 230, 0.3);

  &:hover {
    box-shadow: 0 12px 32px rgba(126, 80, 230, 0.4);
  }
`

interface FinalCTAProps {
  courseOverview: CourseOverview
}

export const FinalCTA: React.FC<FinalCTAProps> = ({courseOverview}) => {
  const activeProduct = courseOverview.courseProducts.find((p) => !p.archived)

  const handlePurchase = () => {
    if (activeProduct) {
      window.location.href = routes.checkout.courseProduct(
        courseOverview.slug,
        activeProduct.productId,
      )
    }
  }

  if (!activeProduct) return null

  return (
    <SectionWrapper>
      <BackgroundGradient />
      <RadialGradient />
      <Container>
        <Content>
          <Heading variant="h2">
            Pripravený stať sa
            <br />
            <GradientText>produktívnejším?</GradientText>
          </Heading>

          <Text size="large" color="secondary">
            Začni programovať s AI nástrojmi ešte dnes a zvýš svoju produktivitu
            o 300%
          </Text>

          <CTAButton variant="accent" onClick={handlePurchase}>
            Kúpiť kurz teraz
          </CTAButton>

          <Text size="small" color="secondary">
            30-dňová záruka vrátenia peňazí • Lifetime prístup • Všetky updaty
            zadarmo
          </Text>
        </Content>
      </Container>
    </SectionWrapper>
  )
}
