import React from 'react'
import Text from './components/core/Text'
import Loading from './components/Loading'

type QueryGuardProps<T> = {
  isLoading: boolean
  isIdle?: boolean
  error: unknown
  data: T
  children: ((data: Exclude<T, undefined>) => JSX.Element | null) | JSX.Element
}

function isDefined<T>(data: T): data is Exclude<T, undefined> {
  return data !== undefined
}

export function QueryGuard<T>({
  isLoading,
  isIdle,
  error,
  data,
  children,
}: QueryGuardProps<T>) {
  if (error) {
    return <Text size="small">Nepodarilo sa načítať</Text>
  }
  if (isDefined(data)) {
    return typeof children === 'function' ? children(data) : children
  }
  return isLoading || isIdle ? <Loading /> : null
}
