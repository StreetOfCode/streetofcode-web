import React from 'react'
import {LectureComment} from '../../../types'
import {useEditLectureComment} from '../../api/lectureComments'
import EditableLectureComment from './EditableLectureComment'

type EditLectureCommentProps = {
  lectureId: number
  comment: LectureComment
  onCommentEdited: () => void
  onCancelled: () => void
}

const EditLectureComment = (
  {lectureId, comment, onCommentEdited, onCancelled}: EditLectureCommentProps,
) => {

  const editLectureCommentMutation = useEditLectureComment(comment.id, lectureId)

  const onEdit = async (commentText: string) => {
    await editLectureCommentMutation.mutateAsync({
      lectureCommentEditRequest: {
        commentText,
      },
    })

    onCommentEdited()
  }

  const onCancel = () => {
    onCancelled()
  }

  return (
    <EditableLectureComment
      initialText={comment.commentText}
      onEditCancelled={onCancel}
      onSubmit={onEdit}
    />
  )
}


export default EditLectureComment
