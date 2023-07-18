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
const PostPreviewCard = ({post, isPodcast}: Props) => {
  const featuredImage = post.featuredImage?.node
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  return (
    <WrapperFlex direction="column" justifyContent="space-between">
      <Flex direction="column" gap="18px">
        <Flex direction="column" gap="8px">
          <FixedSizedHeading variant="h6" align="center">
            {post.title}
          </FixedSizedHeading>
          {post.excerpt && (
            <Excerpt
              align="center"
              dangerouslySetInnerHTML={{__html: post.excerpt}}
            />
          )}
        </Flex>
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
  height: 3.2em;
`

const WrapperFlex = styled(Flex)`
  width: 360px;
  height: 500px;
  padding: 16px 24px;
  border-right: var(--color-accent) 4px solid;
  border-left: var(--color-accent) 4px solid;
  box-shadow: 0px 2px 2px var(--color-shadow), 0px -2px 2px var(--color-shadow);
  border-radius: 16px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: 250ms ease-in-out;
    box-shadow: 0px 4px 10px var(--color-shadow),
      0px -4px 10px var(--color-shadow);
  }

  @media ${device.L} {
    width: 345px;
    height: 480px;
  }

  @media ${device.S} {
    width: 320px;
    height: 440px;
  }

  @media ${device.XS} {
    width: 300px;
    height: 400px;
  }
`

const PaddedFlex = styled(Flex)`
  padding: 0 4px;
`

const Excerpt = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.4;
  height: 5.2em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  opacity: 0.85;
`

const ImageWrapper = styled.div`
  position: relative;
  // images will adapt to this size while preserving their aspect-ratio
  width: 220px;
  height: 220px;

  [theme-type='DARK'] & {
    filter: brightness(0.9);
  }

  img {
    object-position: left;
  }

  @media ${device.S} {
    width: 180px;
    height: 180px;
  }

  @media ${device.XS} {
    width: 160px;
    height: 160px;
  }
`

export default PostPreviewCard
