import React from 'react'
import Head from 'next/head'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import BackLink from '../../components/core/BackLink'
import PostView from '../../components/domain/post/PostView'
import {EMPTY_BLOG_IMAGE_PLACEHOLDER_URL} from '../../components/domain/post/blog/clanky-constants'

interface Props {
  post: Post
}

const Header = ({post}: {post: Post}) => {
  return (
    <Head>
      <title>{post.title} | Street of Code</title>
      <meta
        name="description"
        content={
          post.excerpt?.replace('<p>', '').replace('</p>', '') || 'Chýba úryvok'
        }
      />
      <meta property="og:locale" content="sk_SK" />
      <meta
        property="og:title"
        content={`${post.title || 'podcast'} | Street of Code`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={
          post.excerpt?.replace('<p>', '').replace('</p>', '') || 'Chýba úryvok'
        }
      />
      <meta property="og:url" content={post.uri || ''} />
      <meta
        property="og:image"
        content={
          post.featuredImage?.node?.sourceUrl ||
          EMPTY_BLOG_IMAGE_PLACEHOLDER_URL
        }
      />
      <meta property="og:image:alt" content="Obrázok článka" />
      <meta property="og:site_name" content="Street of Code" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@StreetofCode1" />
    </Head>
  )
}

const SinglePostPage: NextPage<Props> = ({post}) => {
  return (
    <>
      <Header post={post} />
      <NavBar />
      <PageContentWrapper>
        <BackLink to={'/clanky'} text={'Späť na články'} />
        <PostView post={post} />
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug as string

  const post = await getPostBySlug(slug)

  return {
    props: {
      post,
    },
  }
}

export default SinglePostPage
