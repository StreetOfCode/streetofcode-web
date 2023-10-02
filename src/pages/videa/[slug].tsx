import React from 'react'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import NavBar from '../../components/NavBar'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import styled from 'styled-components'
import Flex from '../../components/core/Flex'
import {device} from '../../theme/device'
import AuthorAndDate from '../../components/domain/post/AuthorAndDate'
import {youtubeVideoUrl, youtubeVideosUrl} from '../../api'
import {YouTubeVideo} from '../../types'

const videoDescriptionToHTML = (description: string) => {
  const isUrl = (text: string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(text)
      return true
    } catch (_) {
      return false
    }
  }

  const wrapLinksInAnchorTags = (descriptionLine: string) => {
    const descriptionLineWithLinks = descriptionLine
      .split(' ')
      .map((word) => {
        if (isUrl(word)) {
          return `<a href="${word}">${word}</a>`
        }
        return word
      })
      .join(' ')

    return descriptionLineWithLinks
  }

  const wrapLineInParagraph = (descriptionLine: string) => {
    // empty paragraphs' margins are not rendered in browser so we need to replace them with at least non-breaking space
    if (descriptionLine === '') {
      return '<p>&nbsp;</p>'
    }
    return `<p>${descriptionLine}</p>`
  }

  return description
    .split('\n')
    .map(wrapLinksInAnchorTags)
    .map(wrapLineInParagraph)
    .join('')
}

interface Props {
  video: YouTubeVideo
}

const SingleVideoPage: NextPage<Props> = ({video}) => {
  return (
    <>
      <Head
        title={`${video.snippet.title || 'Video'} | Street of Code`}
        description={
          video.snippet.description ||
          'Toto je video, ktoré nemá poriadny popis. Ups, pardón, doplníme.'
        }
        url={prefixWithHost(routes.videa.slug(video.id || ''))}
        imageUrl={video.snippet.thumbnails.medium.url}
      />
      <NavBar />
      <PageContentWrapper>
        <FlexWrapper direction="column" gap="12px" alignItems="flex-start">
          <StyledPostTitle>{video.snippet.title}</StyledPostTitle>
          <AuthorAndTagsWrapper gap="16px">
            <AuthorAndDateWrapper>
              <AuthorAndDate
                date={video.snippet.publishedAt.value || undefined}
                authorName={'Street of Code' || undefined}
                isPodcastOrVideo
              />
            </AuthorAndDateWrapper>
          </AuthorAndTagsWrapper>
          <PostContent
            dangerouslySetInnerHTML={{
              __html: videoDescriptionToHTML(video.snippet.description),
            }}
          />
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </FlexWrapper>
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string

  const videoResponse = await fetch(youtubeVideoUrl(slug))
  if (videoResponse.status !== 200) {
    return {
      notFound: true,
    }
  }

  const video = await videoResponse.json()

  return {
    props: {
      video,
    },
  }
}

export const getStaticPaths = async () => {
  const videos = (await (
    await fetch(youtubeVideosUrl())
  ).json()) as YouTubeVideo[]
  const slugs = videos.map((video) => video.id)

  const paths = slugs.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: 'blocking',
  }
}

const AuthorAndTagsWrapper = styled(Flex)`
  @media ${device.S} {
    align-self: left;
    align-items: flex-start;
    flex-direction: column;
  }
`

const FlexWrapper = styled(Flex)`
  width: clamp(320px, 100%, 750px);
  margin: 0 auto;

  @media (max-width: 610px) {
    iframe {
      width: 400px;
      height: 225px;
    }
  }

  @media (max-width: 450px) {
    iframe {
      width: 320px;
      height: 180px;
    }
  }

  @media ${device.XS} {
    iframe {
      width: 240px;
      height: 135px;
    }
  }
`

const AuthorAndDateWrapper = styled.div`
  flex-shrink: 0;
`

// Special case when we don't want tu use our Heading component
const StyledPostTitle = styled.h1`
  font-size: 42px;
  font-weight: bold;
  color: var(--color-secondary);

  @media ${device.S} {
    font-size: 32px;
  }
`

const PostContent = styled.div`
  max-width: 100%;

  line-height: 1.6em;
  font-size: 18px;
  font-weight: 100;

  color: var(--color-secondary);

  p:first-of-type {
    margin-top: 0;
  }

  p {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;

    audio {
      margin: 14px 0;
    }

    > * {
      max-width: 100%;
    }
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 10px;
  }
`

export default SingleVideoPage
