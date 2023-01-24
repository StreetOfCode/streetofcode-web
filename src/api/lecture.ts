import {useQuery} from 'react-query'
import * as Api from '../api'
import {Lecture} from '../types'

const P = 'lecture'

export const queryKeys = {
  get: (lectureId: number) => [P, lectureId.toString()],
}

const fetchLecture = async (lectureId: number) => {
  const response = await Api.authFetch(Api.lectureUrl(lectureId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať lekciu')
  }

  return (await response.json()) as Lecture
}

export const useGetLecture = (lectureId: number) => {
  return useQuery(queryKeys.get(lectureId), () => fetchLecture(lectureId), {
    cacheTime: 60 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
  })
}
