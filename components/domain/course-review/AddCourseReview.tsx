import React from 'react'
import {useAddCourseReview} from '../../api/courseReviews'
import EditableCourseReview from './EditableCourseReview'

type AddCourseReviewProps = {
  courseId: number
}

const AddCourseReview = ({courseId}: AddCourseReviewProps) => {
  const addCourseReviewMutation = useAddCourseReview(courseId)

  const addCourseReview = async (rating: number, text: string) => {
    await addCourseReviewMutation.mutateAsync({
      courseId,
      rating,
      text,
    })
  }

  return (
    <EditableCourseReview onSubmit={addCourseReview} />
  )
}


export default AddCourseReview
