import React from 'react'
import {CourseOverview} from '../../../types'
import {HeroSection} from './HeroSection'
import {ComparisonSection} from './ComparisonSection'
import {ToolsSection} from './ToolsSection'
import {CourseContentSection} from './CourseContentSection'
import {PersonasSection} from './PersonasSection'
import {PricingSection} from './PricingSection'
import {FAQSection} from './FAQSection'
import {FinalCTA} from './FinalCTA'
import {StickyButton} from './StickyButton'
import CourseReviews from '../../domain/course-review/CourseReviews'

interface AiCoursePageProps {
  courseOverview: CourseOverview
}

export const AiCoursePage: React.FC<AiCoursePageProps> = ({courseOverview}) => {
  return (
    <>
      <HeroSection courseOverview={courseOverview} />
      <ComparisonSection />
      <ToolsSection />
      <CourseContentSection courseOverview={courseOverview} />
      <PersonasSection />
      <PricingSection courseOverview={courseOverview} />
      <FAQSection />
      <CourseReviews courseOverview={courseOverview} />
      <FinalCTA courseOverview={courseOverview} />
      <StickyButton courseOverview={courseOverview} />
    </>
  )
}

export default AiCoursePage
