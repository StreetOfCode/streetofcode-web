import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import NextLink from '../../core/NextLink'
import Heading from '../../core/Heading'
import {formatDate} from '../../../utils'

type Props = {
  className?: string
  post: Post
}

/***
 * Image should work with 16/9 as well as 1:1 aspect-ratio.
 */
const PostPreview = ({className, post}: Props) => {
  const featuredImage = post.featuredImage?.node
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  return (
    <WrapperFlex className={className} direction="column" gap="12px" alignItems="flex-start">
      {featuredImage && featuredImage.sourceUrl &&
        <NextLink href={`/clanky/${post.slug}`}>
          <ImageWrapper>
            <Image layout="fill" src={featuredImage.sourceUrl} alt={post.title || ''} objectFit="contain" />
          </ImageWrapper>
        </NextLink>
      }
      <NextLink href={`/clanky/${post.slug}`}>
        <Heading variant="h3">{post.title}</Heading>
      </NextLink>
      {post.date && <Text size="small">{formatDate(new Date(post.date))}</Text>}
      {post.excerpt && <Text size="large" dangerouslySetInnerHTML={{__html: post.excerpt}} />}
      {authorName && <Text weight="bold">{authorName}</Text>}
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  max-width: 900px;

  p {
    margin: 0;
    padding: 0;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 300px;

  img {
    object-position: left;
  }
`

export default PostPreview
