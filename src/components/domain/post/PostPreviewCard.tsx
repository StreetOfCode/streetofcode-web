import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {Post} from '../../../wp/types'
import NextLink from '../../core/NextLink'
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
          <FixedSizedHeading variant="h5" align="center" normalWeight>
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
          <NextLink href={`/${isPodcast ? 'podcast' : 'clanky'}/${post.slug}`}>
            <ImageWrapper>
              <Image
                layout="fill"
                src={featuredImage.sourceUrl}
                alt={post.title || ''}
                objectFit="contain"
                priority
              />
            </ImageWrapper>
          </NextLink>
        )}
        {!featuredImage && (
          <NextLink href={`/${isPodcast ? 'podcast' : 'clanky'}/${post.slug}`}>
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
          </NextLink>
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
          {authorName && <Text>{authorName}</Text>}
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
  height: 520px;
  padding: 1em 0.5em;
  border: ${(props) => props.theme.accentColor} 2px solid;
  border-radius: 22px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #d6d6d6;
  }

  @media ${device.mobile} {
    width: 330px;
    height: 480px;
  }
`

const PaddedFlex = styled(Flex)`
  padding: 0 4px;
`

const Excerpt = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  height: 4.6em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const ImageWrapper = styled.div`
  position: relative;
  // images will adapt to this size while preserving their aspect-ratio
  width: 260px;
  height: 260px;

  img {
    object-position: left;
  }
`

export default PostPreviewCard
