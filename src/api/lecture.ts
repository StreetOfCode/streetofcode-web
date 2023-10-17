import {useQuery} from 'react-query'
import * as Api from '../api'
import {Lecture} from '../types'

const P = 'lecture'

export const queryKeys = {
  get: (lectureId: number) => [P, lectureId.toString()],
}

const fetchLecture = async (lectureId: number, preview?: boolean) => {
  const response = await Api.authFetch(Api.lectureUrl(lectureId, preview))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať lekciu')
  }

  return (await response.json()) as Lecture
}

export const useGetLecture = (lectureId: number, preview?: boolean) => {
  return useQuery(
    queryKeys.get(lectureId),
    () => fetchLecture(lectureId, preview),
    {
      cacheTime: 60 * 60 * 1000,
      staleTime: 30 * 60 * 1000,
    },
  )
}
