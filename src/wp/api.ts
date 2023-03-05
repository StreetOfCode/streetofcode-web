import {useQuery} from 'react-query'
import {assert} from '../utils'
import {Post} from './types'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

const WP_API_QUERY_KEY_PREFIX = 'wpApi'

export const queryKeys = {
  category: (categoryName: string, limit: number) => [
    WP_API_QUERY_KEY_PREFIX,
    'category',
    categoryName,
    limit.toString(),
  ],
  author: (authorName?: string) => [
    WP_API_QUERY_KEY_PREFIX,
    'author',
    authorName,
  ],
}

async function fetchAPI(query: string, variables?: object) {
  const headers = {'Content-Type': 'application/json'}
  // WPGraphQL Plugin must be enabled
  const res = await fetch(`${API_URL}/graphql`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.debug('Failed to fetch graphql WP API', {json})
    throw new Error('Failed to fetch graphql WP API')
  }
  return json.data
}

export async function getAllPosts(
  categoryName: string,
  limit = 1000,
): Promise<Post[]> {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(
        first: ${limit},
        where: {
          orderby: { field: DATE, order: DESC },
          categoryName: "${categoryName}"
        }
      ) {
        nodes {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
              firstName
              lastName
              avatar {
                url
              }
            }
          }
          tags {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: true,
        preview: false,
      },
    },
  )

  return data?.posts?.nodes
}

export function useGetAllPosts(categoryName: string, limit = 1000) {
  return useQuery(queryKeys.category(categoryName, limit), () =>
    getAllPosts(categoryName, limit),
  )
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const data = await fetchAPI(`
    {
      post(id: "${slug}", idType: SLUG) {
        id
        title
        excerpt
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
          }
        }
        tags {
          nodes {
            id
            name
          }
        }
      }
    }
  `)

  return data?.post
}

const AUTHOR_WP_ID: Record<string, number> = {
  'Jakub Jahič': 2,
  'Gabriel Kerekeš': 3,
}

export function useGetPostsByAuthor(authorName?: string) {
  return useQuery(
    queryKeys.author(authorName),
    () => {
      assert(!!authorName)
      const authorId = AUTHOR_WP_ID[authorName]
      return getBlogPostsByAuthor(authorId)
    },
    {enabled: !!authorName},
  )
}

async function getBlogPostsByAuthor(authorId: number): Promise<Post[]> {
  const data = await fetchAPI(`
  {
    posts(first: 100, where: {author: ${authorId}, categoryName: "blog"}) {
      nodes {
        title
        excerpt
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
          }
        }
      }
    }
  }
  `)

  return data?.posts?.nodes
}
