import React from 'react'
import styled from 'styled-components'
import {useGetCourseReviews} from '../../../api/courseReviews'
import {QueryGuard} from '../../../QueryGuard'
import Flex from '../../core/Flex'
import CourseReviewItem from './CourseReviewItem'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {CourseOverview} from '../../../types'

interface SidebarCourseReviewsProps {
  className?: string
  courseOverview: CourseOverview
}

const SidebarCourseReviews = ({
  className,
  courseOverview,
}: SidebarCourseReviewsProps) => {
  const {isLoading} = useAuth()

  const courseId = courseOverview.id
  const courseSlug = courseOverview.slug

  const getCourseReviewsQuery = useGetCourseReviews(courseId)

  if (isLoading) return <Loading />

  return (
    <WrapperFlex
      className={className}
      direction="column"
      gap="32px"
      alignSelf="flex-start"
    >
      <QueryGuard {...getCourseReviewsQuery}>
        {(courseReviews) => (
          <Flex direction="column" gap="16px" alignSelf="stretch">
            {/* Show max 2 reviews with highest ratings */}
            {courseReviews
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 2)
              .map((courseReview) => (
                <CourseReviewItem
                  key={courseReview.id}
                  review={courseReview}
                  courseSlug={courseSlug}
                />
              ))}
          </Flex>
        )}
      </QueryGuard>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  max-width: 500px;
  width: 100%;
`

export default SidebarCourseReviews
