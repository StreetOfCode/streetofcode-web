import {isVideoWatchTimes} from './guards'
import {ThemeSetting} from './types'
import {assert, isRunningOnServer} from './utils'

const THEME_SETTING_KEY = 'themeSetting'
const VIDEO_WATCH_TIME_STORAGE_KEY = 'videoWatchTime'

const getThemeSetting = () =>
  !isRunningOnServer()
    ? (localStorage.getItem(THEME_SETTING_KEY) as ThemeSetting | null)
    : null

const setThemeSetting = (themeSetting: ThemeSetting) =>
  !isRunningOnServer() && localStorage.setItem(THEME_SETTING_KEY, themeSetting)

type VideoWatchTime = {
  seconds: number
}

export type VideoWatchTimes = {[videoId: string]: VideoWatchTime}

const getVideoWatchTime = (videoId: string): VideoWatchTime => {
  if (isRunningOnServer()) {
    return {seconds: 0}
  }

  const videoWatchTimeData = localStorage.getItem(VIDEO_WATCH_TIME_STORAGE_KEY)
  if (!videoWatchTimeData) return {seconds: 0}

  const videoWatchTimes = JSON.parse(videoWatchTimeData)
  assert(isVideoWatchTimes(videoWatchTimes))

  return videoWatchTimes[videoId] || {seconds: 0}
}

const setVideoWatchTime = (videoId: string, watchTime: VideoWatchTime) => {
  if (isRunningOnServer()) {
    return
  }

  const videoWatchTimeData = localStorage.getItem(VIDEO_WATCH_TIME_STORAGE_KEY)
  if (!videoWatchTimeData) {
    const videoWatchTimes = Object.fromEntries([[videoId, watchTime]])
    localStorage.setItem(
      VIDEO_WATCH_TIME_STORAGE_KEY,
      JSON.stringify(videoWatchTimes),
    )
    return
  }

  const videoWatchTimes = JSON.parse(videoWatchTimeData)
  assert(isVideoWatchTimes(videoWatchTimes))

  videoWatchTimes[videoId] = watchTime
  localStorage.setItem(
    VIDEO_WATCH_TIME_STORAGE_KEY,
    JSON.stringify(videoWatchTimes),
  )
}

const deleteVideoWatchTime = (videoId: string) => {
  if (isRunningOnServer()) {
    return
  }

  const videoWatchTimeData = localStorage.getItem(VIDEO_WATCH_TIME_STORAGE_KEY)
  if (!videoWatchTimeData) {
    return
  }

  const videoWatchTimes = JSON.parse(videoWatchTimeData)
  assert(isVideoWatchTimes(videoWatchTimes))

  delete videoWatchTimes[videoId]
  localStorage.setItem(
    VIDEO_WATCH_TIME_STORAGE_KEY,
    JSON.stringify(videoWatchTimes),
  )
}

export const storage = {
  getThemeSetting,
  setThemeSetting,
  getVideoWatchTime,
  setVideoWatchTime,
  deleteVideoWatchTime,
}
