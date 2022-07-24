import {useQuery} from 'react-query'
import * as Api from '../../api'
import {Quiz} from '../../types'

const P = 'quiz'

const queryKeys = {
  get: (lectureId: number) => [P, lectureId.toString()],
}

const fetchQuizzesByLectureId = async (lectureId: number) => {
  const response = await Api.authFetch(Api.quizByLectureUrl(lectureId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kvíz')
  }

  return (await response.json()) as Quiz[]
}

export const useGetQuizzesByLecture = (lectureId: number) => {
  return useQuery(queryKeys.get(lectureId), () => fetchQuizzesByLectureId(lectureId), {
    cacheTime: 60000,
    staleTime: 60000,
  })
}
