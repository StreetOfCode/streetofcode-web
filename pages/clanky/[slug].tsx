import React from 'react'
import Head from 'next/head'
import {GetStaticProps, NextPage} from 'next'
import Heading from '../../components/core/Heading'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPostsWithSlug, getPostBySlug} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'

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
  console.log('post', post)
  return (<PageContentWrapper>
    <Header />
    <NavBar />
    <Heading variant="h2">{post.title}</Heading>
  </PageContentWrapper>)
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
  const allPosts = await getAllPostsWithSlug()

  const paths = allPosts.map((post) => ({params: {slug: post.slug}}))

  return {
    paths,
    fallback: true,
  }
}

export default SinglePostPage
