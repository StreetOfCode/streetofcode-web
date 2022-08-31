import {QueryCache, QueryClient} from 'react-query'

export default new QueryClient({
  queryCache: new QueryCache({}),
})
