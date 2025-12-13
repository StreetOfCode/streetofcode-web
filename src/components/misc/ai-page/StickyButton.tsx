import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {CourseOverview} from '../../../types'
import {routes} from '../../../routes'
import Button from '../../core/Button'
import {device} from '../../../theme/device'

const StickyWrapper = styled.div<{visible: boolean}>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  border-top: 2px solid var(--color-accent);
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  z-index: 100;
  transform: translateY(${(props) => (props.visible ? '0' : '100%')});
  transition: transform 0.3s ease;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);

  @media ${device.S} {
    padding: 20px 32px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  justify-content: space-between;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 200px;
`

const CourseName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: var(--color-secondary);

  @media ${device.S} {
    font-size: 18px;
  }
`

const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--color-accent);

  @media ${device.S} {
    font-size: 24px;
  }
`

const CTAButton = styled(Button)`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;

  @media ${device.S} {
    padding: 16px 40px;
    font-size: 18px;
  }
`

interface StickyButtonProps {
  courseOverview: CourseOverview
}

export const StickyButton: React.FC<StickyButtonProps> = ({courseOverview}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button after scrolling down 500px
      if (window.scrollY > 500) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  if (!activeProduct) return null

  return (
    <StickyWrapper visible={visible}>
      <Content>
        <TextContent>
          <CourseName>{courseOverview.name}</CourseName>
          <Price>€{price}</Price>
        </TextContent>
        <CTAButton variant="accent" onClick={handlePurchase}>
          Kúpiť kurz
        </CTAButton>
      </Content>
    </StickyWrapper>
  )
}
