import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import Text from '../../components/core/Text'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import NextLink from '../../components/core/NextLink'

interface Props {
  posts: Post[]
}

const Header = () => {
  return (
    <Head>
      <title>Street of Code | Články</title>
      <meta name="description">Naučíme ťa programovať</meta>
    </Head>
  )
}

const PostsPage: NextPage<Props> = ({posts}) => {
  console.log('posts', posts)
  return (<PageContentWrapper>
    <Header />
    <NavBar />
    {posts && posts.map((post, i) => (
      <NextLink key={i} href={`/clanky/${post.slug}`}>
        <Text>{post.title}</Text>
      </NextLink>
    ))}
  </PageContentWrapper>)
}

export const getStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {posts},
    revalidate: 10,
  }
}

export default PostsPage
