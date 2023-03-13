import React from 'react'
import {useAddPostComment} from '../../../api/postComments'
import EditablePostComment from './EditablePostComment'

type AddPostCommentProps = {
  postId: string
  postSlug: string
}

const AddPostComment = ({postId, postSlug}: AddPostCommentProps) => {
  const addPostCommentMutation = useAddPostComment(postId)

  const addPostComment = async (commentText: string) => {
    await addPostCommentMutation.mutateAsync({
      commentText,
      postSlug,
    })
  }

  return <EditablePostComment onSubmit={addPostComment} />
}

export default AddPostComment
