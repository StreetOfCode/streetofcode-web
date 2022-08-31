import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {
  LectureComment,
  LectureCommentAddRequest,
  LectureCommentEditRequest,
} from '../../types'

const P = 'lectureComments'

export const mutationKeys = {
  add: [P, 'add'],
  edit: (commentId: number) => [P, 'edit', commentId.toString()],
  delete: (commentId: number) => [P, 'delete', commentId.toString()],
}

const queryKeys = {
  get: (lectureId: number) => [P, lectureId.toString()],
}

const fetchLectureComments = async (lectureId: number) => {
  const response = await Api.authFetch(Api.lectureCommentsUrl(lectureId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať komenty')
  }

  return (await response.json()) as LectureComment[]
}

const addLectureComment = async (
  lectureId: number,
  lectureComment: LectureCommentAddRequest,
) => {
  const result = await Api.authPost<LectureCommentAddRequest>(
    Api.lectureCommentsUrl(lectureId),
    lectureComment,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa pridať koment')
  }

  return (await result.json()) as LectureComment
}

const editLectureComment = async (
  commentId: number,
  lectureId: number,
  lectureCommentEditRequest: LectureCommentEditRequest,
) => {
  const result = await Api.authPut<LectureCommentEditRequest>(
    Api.lectureCommentUrl(lectureId, commentId),
    lectureCommentEditRequest,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa zmeniť koment')
  }

  return (await result.json()) as LectureComment
}

const deleteLectureComment = async (commentId: number, lectureId: number) => {
  const result = await Api.authDelete(
    Api.lectureCommentUrl(lectureId, commentId),
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa vymazať koment')
  }
}

export const useGetLectureComments = (lectureId: number) => {
  return useQuery(
    queryKeys.get(lectureId),
    () => fetchLectureComments(lectureId),
    {
      cacheTime: 60000,
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  )
}

export const useAddLectureComment = (lectureId: number) => {
  return useMutation(
    mutationKeys.add,
    (addRequest: LectureCommentAddRequest) =>
      addLectureComment(lectureId, addRequest),
    {
      onSuccess: () =>
        Promise.all(
          [queryKeys.get(lectureId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        ),
    },
  )
}

export const useEditLectureComment = (commentId: number, lectureId: number) => {
  return useMutation(
    mutationKeys.edit(commentId),
    ({
      lectureCommentEditRequest,
    }: {
      lectureCommentEditRequest: LectureCommentEditRequest
    }) => {
      return editLectureComment(commentId, lectureId, lectureCommentEditRequest)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [queryKeys.get(lectureId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        )
      },
    },
  )
}

export const useDeleteLectureComment = (
  commentId: number,
  lectureId: number,
) => {
  return useMutation(
    mutationKeys.delete(commentId),
    () => {
      return deleteLectureComment(commentId, lectureId)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [queryKeys.get(lectureId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        )
      },
    },
  )
}
