import {useQuery} from 'react-query'
import * as Api from '../../api'
import {CourseOverview} from '../../types'

const P = 'myCourses'

export const queryKeys = {
  getMyCourses: [P, 'getMyCourses'],
}

const fetchMyCourses = async () => {
  const response = await Api.authFetch(Api.myCoursesUrl())

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať tvoje kurzy')
  }

  return (await response.json()) as CourseOverview[]
}

export const useGetMyCourses = () => {
  return useQuery(queryKeys.getMyCourses, () => fetchMyCourses(), {
    cacheTime: 60000,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })
}
