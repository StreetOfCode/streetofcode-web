import React from 'react'
import Head from 'next/head'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPostsWithSlug, getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import BackLink from '../../components/core/BackLink'
import PostView from '../../components/domain/post/PostView'

interface Props {
  post: Post
}

const Header = () => {
  return (
    <Head>
      <title>Street of Code | Články</title>
      <meta name="description">Naučíme ťa programovať</meta>
    </Head>
  )
}

const SinglePostPage: NextPage<Props> = ({post}) => {
  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        <BackLink to={'/clanky'} text={'Späť na články'} />
        <PostView post={post} />
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
  const allPostsWithSlug = await getAllPostsWithSlug()

  const paths = allPostsWithSlug.map((post) => ({params: {slug: post.slug}}))

  return {
    paths,
    fallback: true,
  }
}

export default SinglePostPage
