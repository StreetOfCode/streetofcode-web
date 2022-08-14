import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import NextLink from '../../core/NextLink'
import Heading from '../../core/Heading'
import {formatDate} from '../../../utils'
import {device} from '../../../theme/device'

type Props = {
  className?: string
  isPodcast?: boolean
  post: Post
}

/***
 * Works with blog posts and podcasts.
 * Featured image should work with any aspect-ratio.
 */
const PostPreview = ({className, isPodcast, post}: Props) => {
  const featuredImage = post.featuredImage?.node
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  return (
    <WrapperFlex className={className} direction="column" gap="12px" alignItems="flex-start">
      {featuredImage && featuredImage.sourceUrl &&
        <NextLink href={`/${isPodcast ? 'podcasty' : 'clanky'}/${post.slug}`}>
          <ImageWrapper>
            <Image layout="fill" src={featuredImage.sourceUrl} alt={post.title || ''} objectFit="contain" />
          </ImageWrapper>
        </NextLink>
      }
      <NextLink href={`/${isPodcast ? 'podcasty' : 'clanky'}/${post.slug}`}>
        <Heading variant="h3">{post.title}</Heading>
      </NextLink>
      {post.date && <Text size="small">{formatDate(new Date(post.date))}</Text>}
      {post.excerpt && <Text size="large" dangerouslySetInnerHTML={{__html: post.excerpt}} />}
      {!isPodcast && authorName && <Text weight="bold">{authorName}</Text>}
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
  // images will adapt to this size while preserving their aspect-ratio
  width: 450px;
  height: 300px;

  img {
    object-position: left;
  }

  @media ${device.mobile} {
    width: 300px;
    height: 300px;
  }
`

export default PostPreview
