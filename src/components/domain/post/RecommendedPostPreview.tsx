import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {Post} from '../../../wp/types'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {formatDate} from '../../../utils'
import Flex from '../../core/Flex'
import {device} from '../../../theme/device'
import {EMPTY_BLOG_IMAGE_PLACEHOLDER_URL} from './blog/clanky-constants'
import {
  EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL,
  PODCAST_MICROPHONE_IMG,
} from './podcast/podcast-constants'

type Props = {
  post: Post
  isPodcast?: boolean
}

/***
 * Works with blog posts and podcasts.
 * Featured image should work with any aspect-ratio.
 */
const RecommendedPostPreview = ({post, isPodcast}: Props) => {
  const featuredImage = post.featuredImage?.node
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  return (
    <WrapperFlex direction="column" justifyContent="space-between">
      <Flex direction="column" gap="18px">
        <FixedSizedHeading variant="h6" align="center" normalWeight>
          {post.title}
        </FixedSizedHeading>
        {featuredImage && featuredImage.sourceUrl && (
          <ImageWrapper>
            <Image
              layout="fill"
              src={featuredImage.sourceUrl}
              alt={post.title || ''}
              objectFit="contain"
              priority
            />
          </ImageWrapper>
        )}
        {!featuredImage && (
          <ImageWrapper>
            <Image
              layout="fill"
              src={
                isPodcast
                  ? EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL
                  : EMPTY_BLOG_IMAGE_PLACEHOLDER_URL
              }
              alt={post.title || ''}
              objectFit="contain"
              priority
            />
          </ImageWrapper>
        )}
      </Flex>
      {isPodcast && (
        <PaddedFlex
          justifyContent="space-between"
          alignSelf="stretch"
          alignItems="flex-end"
        >
          <Image src={PODCAST_MICROPHONE_IMG} width={20} height={40} />
          {post.date && (
            <Text size="small">{formatDate(new Date(post.date))}</Text>
          )}
        </PaddedFlex>
      )}
      {!isPodcast && (
        <PaddedFlex justifyContent="space-between" alignSelf="stretch">
          {post.date && (
            <Text size="small">{formatDate(new Date(post.date))}</Text>
          )}
          {authorName && <Text align="right">{authorName}</Text>}
        </PaddedFlex>
      )}
    </WrapperFlex>
  )
}

const FixedSizedHeading = styled(Heading)`
  height: 2.6em;
  // show max 2 lines
  overflow-y: hidden;
`

const WrapperFlex = styled(Flex)`
  width: 250px;
  height: 300px;
  padding: 12px 8px;
  border: var(--color-accent) 2px solid;
  border-radius: 22px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px var(--color-shadow);
  }

  @media ${device.S} {
    width: 200px;
    height: 260px;
  }
`

const PaddedFlex = styled(Flex)`
  padding: 0 4px;
`

const ImageWrapper = styled.div`
  position: relative;
  // images will adapt to this size while preserving their aspect-ratio
  width: 150px;
  height: 150px;

  img {
    object-position: left;
  }

  @media ${device.S} {
    width: 120px;
    height: 120px;
  }
`

export default RecommendedPostPreview
