import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getPostsByTag} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {CATEGORY_NAME} from '../../../components/domain/post/blog/clanky-constants'
import Head from '../../../components/Head'
import {prefixWithHost, routes} from '../../../routes'
import PostTags from '../../../components/domain/post/PostTags'
import {Tag} from '../../../types'
import {convertTagToUrlParam} from '../../../components/domain/post/postUtils'

interface Props {
  tag: Tag
  posts: Post[]
}

const PostsByTagPage: NextPage<Props> = ({tag, posts}) => {
  return (
    <>
      <Head
        title="Články | Street of Code"
        description={tag.raw}
        url={prefixWithHost(routes.clanky.tag(tag.urlEconded))}
      />
      <NavBar />
      <PageContentWrapper>
        <PostTags tag={tag} posts={posts} />
      </PageContentWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tagParam = context?.params?.tag as string

  const posts = await getPostsByTag(tagParam, CATEGORY_NAME)
  let rawTag
  if (posts.length > 0) {
    rawTag = posts[0].tags?.nodes?.find(
      (tag) => tag?.name && convertTagToUrlParam(tag?.name) === tagParam,
    )?.name
  }

  return {
    props: {posts, tag: {encodedTag: tagParam, raw: rawTag || ''}},
  }
}

export default PostsByTagPage
