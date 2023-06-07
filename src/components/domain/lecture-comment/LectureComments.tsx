import React from 'react'
import {
  useAddLectureComment,
  useDeleteLectureComment,
  useEditLectureComment,
  useGetLectureComments,
} from '../../../api/lectureComments'
import Comments from '../comments/Comments'

type LectureCommentsProps = {
  lectureId: number
}

const LectureComments = ({lectureId}: LectureCommentsProps) => {
  const getCommentsQuery = useGetLectureComments(lectureId)
  const addCommentMutation = useAddLectureComment(lectureId)
  return (
    <Comments
      entityId={lectureId.toString()}
      allowAnonymous
      commentsQuery={getCommentsQuery}
      onAdd={({commentText}: {commentText: string}) =>
        addCommentMutation.mutateAsync({commentText})
      }
      useEditMutation={useEditLectureComment}
      useDeleteMutation={useDeleteLectureComment}
    />
  )
}

export default LectureComments
