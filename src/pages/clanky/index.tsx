import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {CATEGORY_NAME} from '../../components/domain/post/blog/clanky-constants'
import BlogPosts from '../../components/domain/post/blog/BlogPosts'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'

interface Props {
  posts: Post[]
}

const PostsPage: NextPage<Props> = ({posts}) => {
  return (
    <>
      <Head
        title="Články | Street of Code"
        description="Píšeme o všeličom. Tutorály, rozhovory, blogy."
        url={prefixWithHost(routes.clanky.index)}
      />
      <NavBar />
      <PageContentWrapper>
        <BlogPosts posts={posts} />
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getAllPosts(CATEGORY_NAME)

  return {
    props: {posts},
    revalidate: 600,
  }
}

export default PostsPage
