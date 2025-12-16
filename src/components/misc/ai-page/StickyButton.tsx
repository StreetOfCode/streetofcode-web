import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {CourseOverview} from '../../../types'
import {device} from '../../../theme/device'
import {useAuth} from '../../../AuthUserContext'
import * as Utils from '../../../utils'
import AiCTAButton from './AiCTAButton'

interface StickyButtonProps {
  courseOverview: CourseOverview
  hidden?: boolean
}

const StickyButton: React.FC<StickyButtonProps> = ({
  courseOverview,
  hidden,
}) => {
  const {user} = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const states = Utils.getCourseProductStates(courseOverview, user)

  // Only show sticky button when user needs to pay (paid course, not owned)
  if (!states.hasActiveProductsButIsNotOwnedByUser) return null

  if (!isVisible || hidden) return null

  return (
    <>
      {/* Desktop version */}
      <DesktopWrapper>
        <AiCTAButton courseOverview={courseOverview} variant="sticky" />
      </DesktopWrapper>

      {/* Mobile version */}
      <MobileWrapper>
        <AiCTAButton courseOverview={courseOverview} variant="sticky" />
      </MobileWrapper>
    </>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const DesktopWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 50;
  animation: ${fadeInUp} 0.3s ease-out;

  @media ${device.M} {
    display: none;
  }
`

const MobileWrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 16px;
  background: rgba(var(--color-primary-rgb, 255, 255, 255), 0.8);
  background: var(--color-primary);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-shadow);
  animation: ${fadeInUp} 0.3s ease-out;

  @media ${device.M} {
    display: block;
  }
`

export default StickyButton
