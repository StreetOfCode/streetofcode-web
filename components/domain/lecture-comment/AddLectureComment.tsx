import React from 'react'
import {useAddLectureComment} from '../../api/lectureComments'
import EditableLectureComment from './EditableLectureComment'

type AddLectureCommentProps = {
  lectureId: number
}

const AddLectureComment = ({lectureId}: AddLectureCommentProps) => {
  const addLectureCommentMutation = useAddLectureComment(lectureId)

  const addLectureComment = async (commentText: string) => {
    await addLectureCommentMutation.mutateAsync({
      commentText,
    })
  }

  return (
    <EditableLectureComment onSubmit={addLectureComment} />
  )
}


export default AddLectureComment
