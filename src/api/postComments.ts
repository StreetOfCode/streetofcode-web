import {useMutation, useQuery} from 'react-query'
import * as Api from '../api'
import queryClient from '../queryClient'
import {
  PostComment,
  PostCommentAddRequest,
  PostCommentEditRequest,
} from '../types'

const P = 'postComments'

export const mutationKeys = {
  add: [P, 'add'],
  edit: (commentId: number) => [P, 'edit', commentId.toString()],
  delete: (commentId: number) => [P, 'delete', commentId.toString()],
}

const queryKeys = {
  get: (postId: string) => [P, postId.toString()],
}

const fetchPostComments = async (postId: string) => {
  const response = await Api.authFetch(Api.postCommentsUrl(postId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať komenty')
  }

  return (await response.json()) as PostComment[]
}

const addPostComment = async (
  postId: string,
  postComment: PostCommentAddRequest,
) => {
  const result = await Api.authPost<PostCommentAddRequest>(
    Api.postCommentsUrl(postId),
    postComment,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa pridať koment')
  }

  return (await result.json()) as PostComment
}

const editPostComment = async (
  commentId: number,
  postId: string,
  postCommentEditRequest: PostCommentEditRequest,
) => {
  const result = await Api.authPut<PostCommentEditRequest>(
    Api.postCommentUrl(postId, commentId),
    postCommentEditRequest,
  )

  if (!result.ok) {
    throw Error('Nepodarilo sa zmeniť koment')
  }

  return (await result.json()) as PostComment
}

const deletePostComment = async (commentId: number, postId: string) => {
  const result = await Api.authDelete(Api.postCommentUrl(postId, commentId))

  if (!result.ok) {
    throw Error('Nepodarilo sa vymazať koment')
  }
}

export const useGetPostComments = (postId: string) => {
  return useQuery(queryKeys.get(postId), () => fetchPostComments(postId))
}

export const useAddPostComment = (postId: string) => {
  return useMutation(
    mutationKeys.add,
    (addRequest: PostCommentAddRequest) => addPostComment(postId, addRequest),
    {
      onSuccess: () =>
        Promise.all(
          [queryKeys.get(postId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        ),
    },
  )
}

export const useEditPostComment = (commentId: number, postId: string) => {
  return useMutation(
    mutationKeys.edit(commentId),
    ({
      postCommentEditRequest,
    }: {
      postCommentEditRequest: PostCommentEditRequest
    }) => {
      return editPostComment(commentId, postId, postCommentEditRequest)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [queryKeys.get(postId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        )
      },
    },
  )
}

export const useDeletePostComment = (commentId: number, postId: string) => {
  return useMutation(
    mutationKeys.delete(commentId),
    () => {
      return deletePostComment(commentId, postId)
    },
    {
      onSuccess: () => {
        return Promise.all(
          [queryKeys.get(postId)].map((key) =>
            queryClient.invalidateQueries(key),
          ),
        )
      },
    },
  )
}
