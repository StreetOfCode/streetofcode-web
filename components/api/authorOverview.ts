import {useQuery} from 'react-query'
import * as Api from '../../api'
import {AuthorOverview} from '../../types'

const P = 'authorOverview'

const queryKeys = {
  get: (slug: string) => [P, slug],
}

const fetchAuthorOverview = async (slug: string) => {
  const response = await Api.authFetch(Api.authorOverviewUrl(slug))

  if (!response.ok) {
    // TODO
    throw Error('authors error - TBD')
  }

  return (await response.json()) as AuthorOverview
}

export const useGetAuthorOverview = (slug: string, enabled?: boolean | undefined) => {
  return useQuery(queryKeys.get(slug), () => fetchAuthorOverview(slug), {
    cacheTime: 60000,
    staleTime: 60000,
    enabled,
  })
}
