import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug, getPostsByTag} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import PostView from '../../components/domain/post/PostView'
import {
  CATEGORY_NAME,
  EMPTY_BLOG_IMAGE_PLACEHOLDER_URL,
  RECOMMENDED_POSTS_NUMBER,
} from '../../components/domain/post/blog/clanky-constants'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import {convertTagToUrlParam} from '../../utils'

interface Props {
  post: Post
  recommendedPosts: Post[]
}

const SinglePostPage: NextPage<Props> = ({post, recommendedPosts}) => {
  return (
    <>
      <Head
        title={`${post.title || 'Článok'} | Street of Code`}
        description={
          post.excerpt?.replace('<p>', '').replace('</p>', '') ||
          'Toto je článok, ktorý nemá poriadny popis. Ups, pardón, doplníme.'
        }
        url={prefixWithHost(routes.clanky.slug(post.slug || ''))}
        imageUrl={
          post.featuredImage?.node?.sourceUrl ||
          EMPTY_BLOG_IMAGE_PLACEHOLDER_URL
        }
      />
      <NavBar />
      <PageContentWrapper>
        <PostView post={post} recommendedPosts={recommendedPosts} />
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug as string

  const post = await getPostBySlug(slug)

  const recommendedPosts: Post[] = []
  const tagsToFind: string[] = post.tags?.nodes?.map((n) => n?.name || '') || []
  while (
    tagsToFind.length > 0 &&
    recommendedPosts.length < RECOMMENDED_POSTS_NUMBER
  ) {
    const posts = await getPostsByTag(
      convertTagToUrlParam(tagsToFind.pop() || ''),
      CATEGORY_NAME,
      RECOMMENDED_POSTS_NUMBER,
    )
    recommendedPosts.push(
      ...posts
        .filter((p) => p.id !== post.id)
        .splice(0, RECOMMENDED_POSTS_NUMBER - recommendedPosts.length),
    )
  }

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
