import styled, {keyframes} from 'styled-components'
import {device} from '../../../theme/device'

// Gradient text effect
export const GradientText = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, var(--color-accent), #4f8fef, #00b8d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 2px 0;
`

// Gradient border card
export const GradientBorderCard = styled.div`
  position: relative;
  background: var(--color-primary);
  border-radius: 16px;
  padding: 32px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
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

// Section wrapper with consistent padding
export const Section = styled.section`
  padding: 80px 0;
  position: relative;

  @media ${device.S} {
    padding: 48px 0;
  }
`

// Container with max-width
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`

// Fade-in animation
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const AnimatedElement = styled.div<{delay?: number}>`
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay || 0}ms;
  opacity: 0;
`

// Scale-in animation
export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// Float animation for code editor
export const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

// Section title wrapper
export const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 48px;

  @media ${device.S} {
    margin-bottom: 32px;
  }
`

// Card hover effect mixin (as a styled component)
export const HoverCard = styled(GradientBorderCard)`
  transition: transform 0.3s ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`

// Feature item with icon
export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

export const FeatureIconWrapper = styled.div<{
  bgColor?: string
  size?: string
}>`
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  min-width: ${(props) => props.size || '40px'};
  border-radius: 10px;
  background: ${(props) => props.bgColor || 'rgba(126, 80, 230, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-accent);
  }
`

// Badge component
export const Badge = styled.span<{bgColor?: string}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: ${(props) => props.bgColor || 'var(--color-accent)'};
  color: white;
  font-size: 12px;
  font-weight: 600;
`

// Gradient background overlay
export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(126, 80, 230, 0.1) 0%,
    rgba(79, 143, 239, 0.1) 50%,
    rgba(0, 184, 212, 0.1) 100%
  );
  pointer-events: none;
`

// Progress bar
export const ProgressBar = styled.div`
  height: 8px;
  background: var(--color-shadow);
  border-radius: 9999px;
  overflow: hidden;
`

export const ProgressBarFill = styled.div<{width: string}>`
  height: 100%;
  width: ${(props) => props.width};
  background: linear-gradient(90deg, var(--color-accent), #4f8fef, #00b8d4);
  border-radius: 9999px;
`

// Bullet point
export const BulletPoint = styled.div`
  width: 6px;
  height: 6px;
  min-width: 6px;
  border-radius: 50%;
  background: var(--color-accent);
`
