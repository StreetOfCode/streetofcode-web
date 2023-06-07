import React from 'react'
import styled from 'styled-components'
import {Comment, CommentEditRequest} from '../../../types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import CommentItem from './CommentItem'
import {QueryGuard} from '../../../QueryGuard'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {device} from '../../../theme/device'
import {UseMutationResult, UseQueryResult} from 'react-query'
import EditableComment from './EditableComment'

type CommentsProps = {
  entityId: string
  allowAnonymous: boolean
  commentsQuery: UseQueryResult<Comment[], unknown>
  onAdd: ({commentText}: {commentText: string}) => Promise<Comment>
  useEditMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<Comment, unknown, CommentEditRequest, unknown>
  useDeleteMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<void, unknown, void, unknown>
}

const Comments = ({
  entityId,
  allowAnonymous,
  commentsQuery,
  onAdd,
  useEditMutation,
  useDeleteMutation,
}: CommentsProps) => {
  const {userId, isLoading} = useAuth()

  const canAddComment = allowAnonymous || !!userId

  if (isLoading) return <Loading />

  return (
    <QueryGuard {...commentsQuery}>
      {(comments) => {
        return (
          <CommentsContent
            entityId={entityId}
            comments={comments}
            canAddComment={canAddComment}
            onAdd={onAdd}
            useEditMutation={useEditMutation}
            useDeleteMutation={useDeleteMutation}
          />
        )
      }}
    </QueryGuard>
  )
}

const CommentsContent = ({
  entityId,
  comments,
  canAddComment,
  onAdd,
  useEditMutation,
  useDeleteMutation,
}: {
  entityId: string
  comments: Comment[]
  canAddComment: boolean
  onAdd: ({commentText}: {commentText: string}) => Promise<Comment>
  useEditMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<Comment, unknown, CommentEditRequest, unknown>
  useDeleteMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<void, unknown, void, unknown>
}) => {
  return (
    <WrapperFlex direction="column" gap="32px">
      <Flex gap="16px" alignSelf="flex-start">
        <Heading variant="h4" normalWeight>
          Komentáre
        </Heading>
        <Text>({comments.length})</Text>
      </Flex>

      {canAddComment && <EditableComment onSubmit={onAdd} />}

      <Flex direction="column" gap="16px" alignSelf="stretch">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            entityId={entityId}
            comment={comment}
            useEditMutation={useEditMutation}
            useDeleteMutation={useDeleteMutation}
          />
        ))}
      </Flex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  width: 500px;

  @media ${device.M} {
    width: 400px;
  }

  @media ${device.S} {
    width: 100%;
  }
`

export default Comments
