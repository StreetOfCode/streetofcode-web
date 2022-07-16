import {CircularProgress} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {LectureComment} from '../../../types'
import {useDeleteLectureComment} from '../../api/lectureComments'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import UserAvatar from '../user/UserAvatar'
import EditLectureComment from './EditLectureComment'

type LectureCommentItemProps = {
  lectureId: number
  comment: LectureComment
}

const LectureCommentItem = ({lectureId, comment}: LectureCommentItemProps) => {
  const {userId, isLoading} = useAuth()

  const deleteLectureCommentMutation = useDeleteLectureComment(comment.id, lectureId)

  const onDelete = async () => {
    await deleteLectureCommentMutation.mutateAsync()
  }

  const [isEditing, onEdited, onEditCancelled, EditItemActions] = useEditItemActions({
    deleteAction: onDelete,
    dialogTitle: 'Zmazať komentár?',
  })

  if (isLoading) return <CircularProgress />

  const isUpdatingAllowed = comment.userId === userId

  return (
    <CommentItem>
      <Flex gap="12px" alignSelf="stretch">
        <Flex direction="column" alignSelf="flex-start">
          <UserAvatar imageUrl={comment.imageUrl} name={comment.userName} sizePx={40} />
          <Text align="center">{comment.userName}</Text>
        </Flex>
        {!isEditing && (
          <ReviewField>
            <Flex gap="8px" justifyContent="space-between">
              <Text>{comment.commentText}</Text>
              <Flex justifyContent="space-between" alignSelf="flex-start">
                {isUpdatingAllowed && <EditItemActions />}
              </Flex>
            </Flex>
          </ReviewField>
        )}
        {isEditing && (
          <EditLectureComment
            lectureId={lectureId}
            comment={comment}
            onCommentEdited={onEdited}
            onCancelled={onEditCancelled}
          />
        )}
      </Flex>
    </CommentItem>
  )
}

const CommentItem = styled.div`
  align-self: stretch;
`

const ReviewField = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.accentColor};
`

export default LectureCommentItem
