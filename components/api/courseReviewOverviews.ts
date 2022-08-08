import {useQuery} from 'react-query'
import * as Api from '../../api'
import {CourseReviewsOverview} from '../../types'

const P = 'courseReviewsOverview'

export const queryKeys = {
  get: (courseId: number) => [P, courseId.toString()],
}

const fetchCourseReviewsOverview = async (courseId: number) => {
  const response = await Api.authFetch(Api.courseReviewsOverviewUrl(courseId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kurzové hodnotenia')
  }

  return (await response.json()) as CourseReviewsOverview
}

export const useGetCourseReviewsOverview = (courseId: number) => {
  return useQuery(queryKeys.get(courseId), () => fetchCourseReviewsOverview(courseId), {
    cacheTime: 60000,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })
}
