import React from 'react'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts, getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import PostView from '../../components/domain/post/PostView'
import {
  CATEGORY_NAME,
  EMPTY_BLOG_IMAGE_PLACEHOLDER_URL,
} from '../../components/domain/post/blog/clanky-constants'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'

interface Props {
  post: Post
}

const SinglePostPage: NextPage<Props> = ({post}) => {
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
        <PostView post={post} />
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let slug = context?.params?.slug as string
  let revalidate = false
  if (slug.includes('&')) {
    revalidate = slug.split('&')[1] === 'revalidate=true'
    slug = slug.split('&')[0]
  }

  const post = await getPostBySlug(slug, revalidate)
  if (post != null && post.id != null) {
    return {
      props: {
        post,
      },
      revalidate: 60,
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths = async () => {
  const posts = await getAllPosts(CATEGORY_NAME)
  const slugs = posts.map((post) => post.slug)

  const paths = slugs.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default SinglePostPage
