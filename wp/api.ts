import {Post} from './types'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

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
    throw new Error('Failed to fetch graphql WP API')
  }
  return json.data
}


export async function getAllPosts(): Promise<Post[]> {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(
        first: 1000,
        where: {
          orderby: { field: DATE, order: DESC },
          categoryName: "Blog"
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


export async function getAllPostsWithSlug(): Promise<Post[]> {
  const data = await fetchAPI(`
    {
      posts(first: 1000, where: {categoryName: "Blog"}) {
        nodes {
          slug
        }
      }
    }
  `)

  return data?.posts?.nodes
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const data = await fetchAPI(`
    {
      post(id: "${slug}", idType: SLUG) {
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
  `)

  return data?.post
}
