import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {CourseOverview} from '../../../types'
import HeroSection from './HeroSection'
import ComparisonSection from './ComparisonSection'
import ToolsSection from './ToolsSection'
import CourseContentSection from './CourseContentSection'
import PersonasSection from './PersonasSection'
import PricingSection from './PricingSection'
import FAQSection from './FAQSection'
import FinalCTA from './FinalCTA'
import StickyButton from './StickyButton'
import CourseReviews from '../../domain/course-review/CourseReviews'

interface AiCoursePageProps {
  courseOverview: CourseOverview
}

export const AiCoursePage: React.FC<AiCoursePageProps> = ({courseOverview}) => {
  const lecturesCount = courseOverview.chapters.flatMap(
    (chapter) => chapter.lectures,
  ).length

  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const [isPricingVisible, setIsPricingVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (pricingSectionRef.current) {
        const hasReachedPricing =
          window.scrollY + window.innerHeight >=
          pricingSectionRef.current.offsetTop
        setIsPricingVisible(hasReachedPricing)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Wrapper>
      <HeroSection
        courseOverview={courseOverview}
        lecturesCount={lecturesCount}
      />
      <ComparisonSection />
      <ToolsSection />
      <CourseContentSection courseOverview={courseOverview} />
      <PersonasSection />
      <div ref={pricingSectionRef}>
        <PricingSection courseOverview={courseOverview} />
      </div>
      <FAQSection />
      <FinalCTA courseOverview={courseOverview} />
      <ReviewsWrapper>
        <CourseReviews courseOverview={courseOverview} />
      </ReviewsWrapper>
      <StickyButton courseOverview={courseOverview} hidden={isPricingVisible} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const ReviewsWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 80px 24px;
`

export default AiCoursePage
