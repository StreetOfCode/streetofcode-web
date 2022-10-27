import {useQuery} from 'react-query'
import * as Api from '../../api'
import {QuizQuestionUserAnswer} from '../../types'

const P = 'quizQuestionUserAnswers'

const queryKeys = {
  get: (quizId: number) => [P, quizId.toString()],
}

const fetchQuizQuestionsUserAnswers = async (quizId: number) => {
  const response = await Api.authFetch(Api.previousAnswersByQuizIdUrl(quizId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať kvízové odpovede')
  }

  return (await response.json()) as QuizQuestionUserAnswer[]
}

export const useGetQuizQuestionUserAnswersByQuiz = (quizId: number) => {
  return useQuery(queryKeys.get(quizId), () =>
    fetchQuizQuestionsUserAnswers(quizId),
  )
}
