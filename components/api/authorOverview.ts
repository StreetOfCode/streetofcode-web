import {useQuery} from 'react-query'
import * as Api from '../../api'
import {AuthorOverview} from '../../types'

const P = 'authorOverview'

const queryKeys = {
  get: (authorId: number) => [P, authorId.toString()],
}

const fetchAuthorOverview = async (authorId: number) => {
  const response = await Api.authFetch(Api.authorOverviewUrl(authorId))

  if (!response.ok) {
    // TODO
    throw Error('authors error - TBD')
  }

  return (await response.json()) as AuthorOverview
}

export const useGetAuthorOverview = (authorId: number, enabled?: boolean | undefined) => {
  return useQuery(queryKeys.get(authorId), () => fetchAuthorOverview(authorId), {
    cacheTime: 60000,
    staleTime: 60000,
    enabled,
  })
}
