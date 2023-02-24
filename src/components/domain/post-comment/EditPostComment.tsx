import React from 'react'
import {PostComment} from '../../../types'
import {useEditPostComment} from '../../../api/postComments'
import EditablePostComment from './EditablePostComment'

type EditPostCommentProps = {
  postId: string
  comment: PostComment
  onCommentEdited: () => void
  onCancelled: () => void
}

const EditPostComment = ({
  postId,
  comment,
  onCommentEdited,
  onCancelled,
}: EditPostCommentProps) => {
  const editPostCommentMutation = useEditPostComment(comment.id, postId)

  const onEdit = async (commentText: string) => {
    await editPostCommentMutation.mutateAsync({
      postCommentEditRequest: {
        commentText,
      },
    })

    onCommentEdited()
  }

  const onCancel = () => {
    onCancelled()
  }

  return (
    <EditablePostComment
      initialText={comment.commentText}
      onEditCancelled={onCancel}
      onSubmit={onEdit}
    />
  )
}

export default EditPostComment
