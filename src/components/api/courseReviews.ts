import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {
  CourseReview,
  CourseReviewAddRequest,
  CourseReviewEditRequest,
} from '../../types'
import {queryKeys as courseReviewOverviewsQueryKeys} from './courseReviewOverviews'
import {queryKeys as courseQueryKeys} from './courses'
import {queryKeys as courseOverviewKeys} from './courseOverview'

const P = 'courseReviews'

export const mutationKeys = {
  add: [P, 'add'],
  edit: (reviewId: number) => [P, 'edit', reviewId.toString()],
  delete: (reviewId: number) => [P, 'delete', reviewId.toString()],
}

const queryKeys = {
  get: (courseId: number) => [P, courseId.toString()],
}

const fetchCourseReviews = async (courseId: number) => {
  const response = await Api.authFetch(Api.courseReviewsUrl(courseId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kurzové hodnotenia')
  }

  return (await response.json()) as CourseReview[]
}

const addCourseReview = async (addRequest: CourseReviewAddRequest) => {
  const result = await Api.authPost<CourseReviewAddRequest>(
    Api.addCourseReviewUrl(),
    addRequest,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa pridať hodnotenie kurzu')
  }

  return (await result.json()) as CourseReview
}

const editCourseReview = async (
  reviewId: number,
  courseReviewEditRequest: CourseReviewEditRequest,
) => {
  const result = await Api.authPut<CourseReviewEditRequest>(
    Api.courseReviewUrl(reviewId),
    courseReviewEditRequest,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa zmeniť hodnotenie kurzu')
  }

  return (await result.json()) as CourseReview
}

const deleteCourseReview = async (reviewId: number) => {
  const result = await Api.authDelete(Api.courseReviewUrl(reviewId))

  if (!result.ok) {
    throw Error('Nepodarilo sa vymazať hodnotenie kurzu')
  }

  return (await result.json()) as CourseReview
}

export const useGetCourseReviews = (courseId: number) => {
  return useQuery(queryKeys.get(courseId), () => fetchCourseReviews(courseId))
}

export const useAddCourseReview = (courseId: number, courseSlug: string) => {
  return useMutation(
    mutationKeys.add,
    (courseReview: CourseReviewAddRequest) => addCourseReview(courseReview),
    {
      onSuccess: () =>
        Promise.all(
          [
            queryKeys.get(courseId),
            courseQueryKeys.getCourses,
            courseReviewOverviewsQueryKeys.get(courseId),
            courseOverviewKeys.get(courseSlug),
          ].map((key) => queryClient.invalidateQueries(key)),
        ),
    },
  )
}

export const useEditCourseReview = (
  reviewId: number,
  courseId: number,
  courseSlug: string,
) => {
  return useMutation(
    mutationKeys.edit(reviewId),
    ({
      courseReviewEditRequest,
    }: {
      courseReviewEditRequest: CourseReviewEditRequest
    }) => {
      return editCourseReview(reviewId, courseReviewEditRequest)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [
            queryKeys.get(courseId),
            courseQueryKeys.getCourses,
            courseReviewOverviewsQueryKeys.get(courseId),
            courseOverviewKeys.get(courseSlug),
          ].map((key) => queryClient.invalidateQueries(key)),
        )
      },
    },
  )
}

export const useDeleteCourseReview = (
  reviewId: number,
  courseId: number,
  courseSlug: string,
) => {
  return useMutation(
    mutationKeys.delete(reviewId),
    () => {
      return deleteCourseReview(reviewId)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [
            queryKeys.get(courseId),
            courseQueryKeys.getCourses,
            courseReviewOverviewsQueryKeys.get(courseId),
            courseOverviewKeys.get(courseSlug),
          ].map((key) => queryClient.invalidateQueries(key)),
        )
      },
    },
  )
}
