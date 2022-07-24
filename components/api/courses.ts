import {useQuery} from 'react-query'
import * as Api from '../../api'
import {CourseOverview} from '../../types'

const P = 'courses'

export const queryKeys = {
  getCourses: [P, 'getCourses'],
}

const fetchCourses = async () => {
  const response = await Api.authFetch(Api.coursesOverviewUrl())

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kurzy')
  }

  return (await response.json()) as CourseOverview[]
}

export const useGetCourses = (enabled: boolean | undefined) => {
  return useQuery(queryKeys.getCourses, () => fetchCourses(), {
    cacheTime: 60000,
    staleTime: 60000,
    enabled,
  })
}
