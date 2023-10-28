import React from 'react'
import styled from 'styled-components'
import {useGetCourseReviewsOverview} from '../../../api/courseReviewOverviews'
import {useGetCourseReviews} from '../../../api/courseReviews'
import {QueryGuard} from '../../../QueryGuard'
import Heading from '../../core/Heading'
import Flex from '../../core/Flex'
import AddCourseReview from './AddCourseReview'
import CourseReviewItem from './CourseReviewItem'
import Rating from '../../core/Rating'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {CourseOverview} from '../../../types'

interface CourseReviewsProps {
  className?: string
  courseOverview: CourseOverview
  innerRef?: React.MutableRefObject<null | HTMLDivElement>
}

const CourseReviews = ({
  className,
  courseOverview,
  innerRef,
}: CourseReviewsProps) => {
  const {userId, isLoading} = useAuth()

  const courseId = courseOverview.id
  const courseSlug = courseOverview.slug

  const getCourseReviewsQuery = useGetCourseReviews(courseId)
  const getCourseReviewsOverviewQuery = useGetCourseReviewsOverview(courseId)

  const hasUserReview =
    getCourseReviewsQuery.data &&
    getCourseReviewsQuery.data.some(
      (courseReview) => courseReview.userId === userId,
    )
  const canAddReview = userId && !hasUserReview

  if (isLoading) return <Loading />

  return (
    <WrapperFlex
      className={className}
      innerRef={innerRef}
      direction="column"
      gap="32px"
      alignSelf="flex-start"
    >
      <QueryGuard {...getCourseReviewsOverviewQuery}>
        {(courseReviewsOverview) => (
          <Flex alignSelf="flex-start" gap="32px">
            <Heading variant="h4" normalWeight>
              Hodnotenia
            </Heading>
            <Flex gap="8px">
              <Rating
                readOnly
                value={courseReviewsOverview.averageRating}
                customSize="32px"
              />
            </Flex>
          </Flex>
        )}
      </QueryGuard>

      {canAddReview && (
        <AddCourseReview courseId={courseId} courseSlug={courseSlug} />
      )}

      <QueryGuard {...getCourseReviewsQuery}>
        {(courseReviews) => (
          <Flex direction="column" gap="16px" alignSelf="stretch">
            {courseReviews.map((courseReview) => (
              <CourseReviewItem
                key={courseReview.id}
                review={courseReview}
                courseSlug={courseSlug}
                allowUpdating
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

export default CourseReviews
