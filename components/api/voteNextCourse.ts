import {useQuery} from 'react-query'
import * as Api from '../../api'
import {NextCourseVoteOption} from '../../types'

const P = 'voteNextCourse'

export const queryKeys = {
  getNextCourseOptions: [P, 'getNextCourseOptions'],
}

const fetchNextCourseOptions = async () => {
  const response = await Api.authFetch(Api.voteNextUrl())

  if (!response.ok) {
    if (response.status === 412) {
      return []
    } else {
      throw Error('getNextCourseOptions - TBD')
    }
  }

  return (await response.json()) as NextCourseVoteOption[]
}

export const useGetNextCourseOptions = () => {
  return useQuery(queryKeys.getNextCourseOptions, () => fetchNextCourseOptions(), {
    cacheTime: 60000,
    staleTime: 60000,
  })
}
