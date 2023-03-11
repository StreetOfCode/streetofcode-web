import {getPostsByTag} from '../../../wp/api'
import {Post} from '../../../wp/types'

export function postsToSlugsByTag(posts: Post[]): Map<string, string[]> {
  const result: Map<string, string[]> = new Map()
  posts.forEach((post) => {
    post.tags?.nodes?.forEach((node) => {
      if (node?.name && post.slug) {
        result.set(node.name, [...(result.get(node.name) || []), post.slug])
      }
    })
  })

  return result
}

export function createMapOfPostsByTag(posts: Post[]): Map<string, Post[]> {
  const result: Map<string, Post[]> = new Map()
  posts.forEach((post) => {
    post.tags?.nodes?.forEach((node) => {
      if (node?.name && post.slug) {
        result.set(node.name, [...(result.get(node.name) || []), post])
      }
    })
  })

  return result
}

export function getTopNTags(
  postsByTag: Map<string, Post[]>,
  n: number,
): string[] {
  const tagPostsOccurences: Map<string, number> = new Map()

  for (const tag of Array.from(postsByTag.keys())) {
    tagPostsOccurences.set(tag, postsByTag.get(tag)?.length || 0)
  }

  const mostOccurences = Array.from(tagPostsOccurences.values())
    .sort((a, b) => b - a)
    .slice(0, n)

  const result: string[] = []
  for (const [tag, occurences] of tagPostsOccurences.entries()) {
    if (mostOccurences.includes(occurences) && !result.includes(tag)) {
      result.push(tag)
    }

    if (result.length === n) break
  }

  return result
}

// Removed diacritics and whitespaces
// i.e from 'vysoká škola' -> 'vysoka-skola'
export function convertTagToUrlParam(tag: string): string {
  const tagParam = tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '-')
  return tagParam
}

function getRandomPosts(posts: Post[], n: number): Post[] {
  const randomPosts = []
  for (let i = 0; i < n; i++) {
    if (posts.length > 0) {
      const idx = Math.floor(Math.random() * posts.length)
      randomPosts.push(posts[idx])
      posts.splice(idx, 1) // this removed element from posts so there are no duplicates
    }
  }
  return randomPosts
}

export async function getRecommendedPosts(
  post: Post,
  recommendedCount: number,
  category: string,
): Promise<Post[]> {
  const postsById: Map<string, Post> = new Map()
  const tagsToFind: string[] =
    post.tags?.nodes
      ?.map((n) => n?.name || '')
      .sort(() => 0.5 - Math.random()) || [] // randomize

  while (tagsToFind.length > 0 && postsById.size < recommendedCount) {
    const posts = await getPostsByTag(
      convertTagToUrlParam(tagsToFind.pop() || ''),
      category,
    )

    getRandomPosts(posts, recommendedCount)
      .filter((p) => p.id !== post.id && !postsById.has(p.id))
      .splice(0, recommendedCount - postsById.size)
      .forEach((p) => postsById.set(p.id, p))
  }

  return [...postsById.values()]
}
