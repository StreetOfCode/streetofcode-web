import React from 'react'
import {useAddPostComment} from '../../../api/postComments'
import EditablePostComment from './EditablePostComment'

type AddPostCommentProps = {
  postId: string
  postTitle: string
}

const AddPostComment = ({postId, postTitle}: AddPostCommentProps) => {
  const addPostCommentMutation = useAddPostComment(postId)

  const addPostComment = async (commentText: string) => {
    await addPostCommentMutation.mutateAsync({
      commentText,
      postTitle,
    })
  }

  return <EditablePostComment onSubmit={addPostComment} />
}

export default AddPostComment
