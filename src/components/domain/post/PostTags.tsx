import React from 'react'
import {routes} from '../../../routes'
import {Tag} from '../../../types'
import {Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import NextLink from '../../core/NextLink'
import GridWrapper from './GridWrapper'
import PostPreviewCard from './PostPreviewCard'

type Props = {
  tag: Tag
  posts: Post[]
  podcastTags?: boolean
}

const PostTags = ({tag, posts, podcastTags}: Props) => {
  if (posts.length === 0) {
    return <></>
  }

  return (
    <Flex direction="column" gap="36px">
      <div>
        <Heading inline align="center" variant="h2">
          {tag.raw}
        </Heading>
        <Heading inline variant="h2" color="accent">
          {' '}
          {podcastTags ? 'podcasty' : 'články'}
        </Heading>
      </div>
      <GridWrapper>
        {posts.map((post, i) => (
          <NextLink
            key={i}
            href={
              podcastTags
                ? routes.podcast.slug(post.slug || '')
                : routes.clanky.slug(post.slug || '')
            }
          >
            <PostPreviewCard post={post} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

export default PostTags
