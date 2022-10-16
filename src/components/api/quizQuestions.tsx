import {useQuery} from 'react-query'
import * as Api from '../../api'
import {QuizQuestion} from '../../types'

const P = 'quizQuestions'

const queryKeys = {
  get: (quizId: number) => [P, quizId.toString()],
}

const fetchQuizQuestionsByQuiz = async (quizId: number) => {
  const response = await Api.authFetch(Api.questionsByQuizUrl(quizId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kvízové odpovede')
  }

  return (await response.json()) as QuizQuestion[]
}

export const useGetQuizQuestionsByQuiz = (quizId: number) => {
  return useQuery(queryKeys.get(quizId), () => fetchQuizQuestionsByQuiz(quizId))
}
