import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import PostView from '../../components/domain/post/PostView'
import {
  CATEGORY_NAME,
  EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL,
  RECOMMENDED_PODCASTS_COUNT,
} from '../../components/domain/post/podcast/podcast-constants'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import {getRecommendedPosts} from '../../components/domain/post/postUtils'

interface Props {
  post: Post
  recommendedPosts: Post[]
}

const SinglePostPage: NextPage<Props> = ({post, recommendedPosts}) => {
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
        <PostView post={post} isPodcast recommendedPosts={recommendedPosts} />
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug as string

  const post = await getPostBySlug(slug)
  const recommendedPosts = await getRecommendedPosts(
    post,
    RECOMMENDED_PODCASTS_COUNT,
    CATEGORY_NAME,
  )

  if (post === null) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        post,
        recommendedPosts,
      },
    }
  }
}

export default SinglePostPage
