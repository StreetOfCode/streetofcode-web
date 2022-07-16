import {useQuery} from 'react-query'
import * as Api from '../../api'
import {Lecture} from '../../types'

const P = 'lecture'

export const queryKeys = {
  get: (lectureId: number) => [P, lectureId.toString()],
}

const fetchLecture = async (lectureId: number) => {
  const response = await Api.authFetch(Api.lectureUrl(lectureId))

  if (!response.ok) {
    // TODO
    throw Error('Lecture error - TBD')
  }

  return (await response.json()) as Lecture
}

export const useGetLecture = (lectureId: number) => {
  return useQuery(queryKeys.get(lectureId), () => fetchLecture(lectureId), {
    cacheTime: 60000,
    staleTime: 60000,
  })
}
