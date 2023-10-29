import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {LectureComment} from '../../../types'
import {formatDate, formatDateTime} from '../../../utils'
import {useDeleteLectureComment} from '../../../api/lectureComments'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import Text from '../../core/Text'
import Loading from '../../Loading'
import UserAvatar from '../user/UserAvatar'
import EditLectureComment from './EditLectureComment'
import {device} from '../../../theme/device'
import {Button, Tooltip} from '@mui/material'

type LectureCommentItemProps = {
  lectureId: number
  comment: LectureComment
}

const LectureCommentItem = ({lectureId, comment}: LectureCommentItemProps) => {
  const {userId, isLoading} = useAuth()

  const deleteLectureCommentMutation = useDeleteLectureComment(
    comment.id,
    lectureId,
  )

  const onDelete = async () => {
    await deleteLectureCommentMutation.mutateAsync()
  }

  const isUpdatingAllowed = comment.userId === userId

  const [isEditing, onEdited, onEditCancelled, EditItemActions] =
    useEditItemActions({
      deleteAction: onDelete,
      dialogTitle: 'Zmazať komentár?',
      disabled: !isUpdatingAllowed,
    })

  if (isLoading) return <Loading />

  return (
    <CommentItem>
      {!isEditing && (
        <CommentField>
          <Flex direction="column" alignItems="flex-start" gap="8px">
            <Flex justifyContent="space-between" alignSelf="stretch">
              <CommentTimeWrapper
                gap="6px"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Text size="very-small">
                  {formatDateTime(comment.createdAt)}
                </Text>
                {comment.updatedAt > comment.createdAt && (
                  <Text size="very-small">
                    (upravené {formatDate(comment.updatedAt)})
                  </Text>
                )}
              </CommentTimeWrapper>
              <Flex gap="16px">
                <Flex direction="row">
                  <Tooltip title={comment.userName}>
                    <Button>
                      <UserAvatar
                        src={comment.imageUrl}
                        name={comment.userName}
                        sizePx={32}
                      />
                    </Button>
                  </Tooltip>
                  <EditItemActions />
                </Flex>
              </Flex>
            </Flex>
            <MarkdownView children={comment.commentText} />
          </Flex>
        </CommentField>
      )}
      {isEditing && (
        <EditLectureComment
          lectureId={lectureId}
          comment={comment}
          onCommentEdited={onEdited}
          onCancelled={onEditCancelled}
        />
      )}
    </CommentItem>
  )
}

const CommentItem = styled.div`
  align-self: stretch;
`

const CommentField = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-accent);
`
const CommentTimeWrapper = styled(Flex)`
  @media ${device.S} {
    flex-direction: column;
    gap: 2px;
  }
`

export default LectureCommentItem
