import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {
  QuestionCorrectness,
  QuizQuestionUserAnswer,
  QuizQuestionUserAnswerRequest,
  QuizRemoveAnswersRequest,
} from '../../types'

const P = 'quizQuestionUserAnswers'

const mutationKeys = {
  removeUserAnswers: () => [P, 'removeUserAnswers'],
  submitUserAnswer: () => [P, 'submitUserAnswer'],
}

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

const submitQuizQuestionAnswer = async (
  answerRequest: QuizQuestionUserAnswerRequest,
) => {
  const response = await Api.authPost<QuizQuestionUserAnswerRequest>(
    Api.answerQuestionUrl(),
    answerRequest,
  )

  const correctness: QuestionCorrectness = await response.json()
  return correctness
}

const removeUserAnswers = async (lectureId: number) => {
  const response = await Api.authDelete<QuizRemoveAnswersRequest>(
    Api.removeAnswersByQuizIdUrl(),
    {lectureId},
  )

  if (!response.ok) {
    throw Error('Nepodarilo sa vymazať kvízové odpovede')
  }
}

export const useGetQuizQuestionUserAnswersByQuiz = (quizId: number) => {
  return useQuery(queryKeys.get(quizId), () =>
    fetchQuizQuestionsUserAnswers(quizId),
  )
}

export const useSubmitUserAnswer = (quizId: number) => {
  return useMutation(
    mutationKeys.submitUserAnswer(),
    (answerRequest: QuizQuestionUserAnswerRequest) =>
      submitQuizQuestionAnswer(answerRequest),
    {
      onSuccess: (data) => {
        if (data.isCorrect) {
          queryClient.invalidateQueries(queryKeys.get(quizId))
        }
      },
    },
  )
}

export const useRemoveUserAnswers = () => {
  return useMutation(
    mutationKeys.removeUserAnswers(),
    (lectureId: number) => removeUserAnswers(lectureId),
    {
      onSuccess: () => queryClient.invalidateQueries({queryKey: [P]}),
    },
  )
}
