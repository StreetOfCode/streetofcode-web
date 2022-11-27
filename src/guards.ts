import type {VideoWatchTimes} from './localStorage'

export const isVideoWatchTimes = (value: unknown): value is VideoWatchTimes => {
  if (value == null || typeof value !== 'object') return false
  return !Object.entries(value)
    .map(([key, v]) => {
      if (typeof key !== 'string') return false
      if (v == null || typeof v !== 'object') return false
      if (!('seconds' in v) && typeof v['seconds'] !== 'number') return false
      return true
    })
    .some((v) => !v)
}
