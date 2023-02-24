import React from 'react'
import styled from 'styled-components'
import {PostComment} from '../../../types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import AddPostComment from './AddPostComment'
import PostCommentItem from './PostCommentItem'
import {QueryGuard} from '../../../QueryGuard'
import {useGetPostComments} from '../../../api/postComments'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {device} from '../../../theme/device'

type PostCommentsProps = {
  postId: string
  postTitle: string
}

const PostComments = ({postId, postTitle}: PostCommentsProps) => {
  const {isLoading} = useAuth()

  const usePostComments = useGetPostComments(postId)

  if (isLoading) return <Loading />

  return (
    <QueryGuard {...usePostComments}>
      {(postComments) => {
        return (
          <PostCommentsContent
            postId={postId}
            postTitle={postTitle}
            postComments={postComments}
          />
        )
      }}
    </QueryGuard>
  )
}

const PostCommentsContent = ({
  postId,
  postTitle,
  postComments,
}: {
  postId: string
  postTitle: string
  postComments: PostComment[]
}) => {
  return (
    <WrapperFlex direction="column" gap="32px">
      <Flex gap="16px" alignSelf="flex-start">
        <Heading variant="h4" normalWeight>
          Komentáre
        </Heading>
        <Text>({postComments.length})</Text>
      </Flex>
      <AddPostComment postId={postId} postTitle={postTitle} />
      <Flex direction="column" gap="16px" alignSelf="stretch">
        {postComments.map((postComment) => (
          <PostCommentItem
            key={postComment.id}
            postId={postId}
            comment={postComment}
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

export default PostComments
