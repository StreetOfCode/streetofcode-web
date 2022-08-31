import {useQuery} from 'react-query'
import * as Api from '../../api'
import {CourseOverview} from '../../types'

const P = 'courseOverview'

export const queryKeys = {
  get: (slug: string) => [P, slug],
}

const fetchCourseOverview = async (slug: string) => {
  const response = await Api.authFetch(Api.courseOverviewUrl(slug))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kurz')
  }

  return (await response.json()) as CourseOverview
}

export const useGetCourseOverview = (
  slug: string,
  enabled: boolean | undefined,
) => {
  return useQuery(queryKeys.get(slug), () => fetchCourseOverview(slug), {
    cacheTime: 60000,
    staleTime: 60000,
    enabled,
    refetchOnWindowFocus: false,
  })
}
