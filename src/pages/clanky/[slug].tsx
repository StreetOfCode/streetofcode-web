import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import BackLink from '../../components/core/BackLink'
import PostView from '../../components/domain/post/PostView'
import {EMPTY_BLOG_IMAGE_PLACEHOLDER_URL} from '../../components/domain/post/blog/clanky-constants'
import Head from '../../components/Head'
import {routes} from '../../routes'

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
        url={post.uri || ''}
        imageUrl={
          post.featuredImage?.node?.sourceUrl ||
          EMPTY_BLOG_IMAGE_PLACEHOLDER_URL
        }
      />
      <NavBar />
      <PageContentWrapper>
        <BackLink to={routes.clanky.index} text={'Späť na články'} />
        <PostView post={post} />
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
