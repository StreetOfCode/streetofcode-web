import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import BackLink from '../../components/core/BackLink'
import PostView from '../../components/domain/post/PostView'
import {EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL} from '../../components/domain/post/podcast/podcast-constants'
import Head from '../../components/Head'

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
        url={post.uri || ''}
        imageUrl={
          post.featuredImage?.node?.sourceUrl ||
          EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL
        }
      />
      <NavBar />
      <PageContentWrapper>
        <BackLink to={'/podcast'} text={'Späť na podcast'} />
        <PostView post={post} isPodcast />
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
