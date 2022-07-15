import {useQuery} from 'react-query'
import * as Api from '../../api'
import {CourseOverview} from '../../types'

const P = 'courseOverview'

const queryKeys = {
  get: (courseId: number) => [P, courseId.toString()],
}

const fetchCourseOverview = async (courseId: number) => {
  const response = await Api.authFetch(Api.courseOverviewUrl(courseId))

  if (!response.ok) {
    // TODO
    throw Error('Courses error - TBD')
  }

  return (await response.json()) as CourseOverview
}

export const useGetCourseOverview = (courseId: number, enabled: boolean | undefined) => {
  return useQuery(queryKeys.get(courseId), () => fetchCourseOverview(courseId), {
    cacheTime: 60000,
    staleTime: 60000,
    enabled,
  })
}
