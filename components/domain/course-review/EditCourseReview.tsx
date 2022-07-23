import React from 'react'
import {useEditCourseReview} from '../../api/courseReviews'
import {CourseReview} from '../../../types'
import EditableCourseReview from './EditableCourseReview'

type EditCourseReviewProps = {
  courseSlug: string
  review: CourseReview
  onCancelled: () => void
  onEdited: () => void
}

const EditCourseReview = ({courseSlug, review, onCancelled, onEdited}: EditCourseReviewProps) => {
  const editCourseReviewMutation = useEditCourseReview(review.id, review.courseId, courseSlug)

  const onEdit = async (rating: number, text: string) => {
    await editCourseReviewMutation.mutateAsync({
      courseReviewEditRequest: {
        rating,
        text,
      },
    })

    onEdited()
  }

  return (
    <EditableCourseReview
      initialRating={review.rating}
      initialText={review.text}
      onEditCancelled={onCancelled}
      onSubmit={onEdit}
    />
  )
}


export default EditCourseReview
