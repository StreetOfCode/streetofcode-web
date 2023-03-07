import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getPostsByTag} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {CATEGORY_NAME} from '../../../components/domain/post/blog/clanky-constants'
import Head from '../../../components/Head'
import {prefixWithHost, routes} from '../../../routes'
import TagBlogPosts from '../../../components/domain/post/blog/TagBlogPosts'

interface Props {
  tag: string
  posts: Post[]
}

const PostsByTagPage: NextPage<Props> = ({tag, posts}) => {
  return (
    <>
      <Head
        title="Články | Street of Code"
        description={tag}
        url={prefixWithHost(routes.clanky.tag(tag))}
      />
      <NavBar />
      <PageContentWrapper>
        <TagBlogPosts tag={tag} posts={posts} />
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tag = context?.params?.tag as string

  const posts = await getPostsByTag(tag, CATEGORY_NAME)

  return {
    props: {posts, tag},
  }
}

export default PostsByTagPage
