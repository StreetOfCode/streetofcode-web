import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import PostView from '../../components/domain/post/PostView'
import {EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL} from '../../components/domain/post/podcast/podcast-constants'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import PostContentWrapper from '../../components/PostContentWrapper'

interface Props {
  post: Post
}

const SinglePostPage: NextPage<Props> = ({post}) => {
  return (
    <>
      <Head
        title={`${post.title || 'Podcast'} | Street of Code`}
        description={
          post.excerpt?.replace('<p>', '').replace('</p>', '') ||
          'Toto je epizódka podcastu, ktorá nemá poriadny popis. Ups, pardón, doplníme.'
        }
        url={prefixWithHost(routes.podcast.slug(post.slug || ''))}
        imageUrl={
          post.featuredImage?.node?.sourceUrl ||
          EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL
        }
      />
      <NavBar />
      <PageContentWrapper>
        <PostContentWrapper>
          <PostView post={post} isPodcast />
        </PostContentWrapper>
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug as string

  const post = await getPostBySlug(slug)

  if (post === null) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        post,
      },
    }
  }
}

export default SinglePostPage
