import React from 'react'
import Head from 'next/head'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPostsWithSlug, getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import BackLink from '../../components/core/BackLink'
import PostView from '../../components/domain/post/PostView'
import {CATEGORY_NAME} from './constants'

interface Props {
  post: Post
}

const Header = ({post}: {post: Post}) => {
  return (
    <Head>
      <title>{post.title}</title>
      <meta name="description">{post.excerpt}</meta>
    </Head>
  )
}

const SinglePostPage: NextPage<Props> = ({post}) => {
  return (
    <>
      <Header post={post} />
      <NavBar />
      <PageContentWrapper>
        <BackLink to={'/podcasty'} text={'Späť na podcasty'} />
        <PostView post={post} isPodcast />
      </PageContentWrapper>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string

  const post = await getPostBySlug(slug)

  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const allPostsWithSlug = await getAllPostsWithSlug(CATEGORY_NAME)

  const paths = allPostsWithSlug.map((post) => ({params: {slug: post.slug}}))

  return {
    paths,
    fallback: true,
  }
}

export default SinglePostPage
