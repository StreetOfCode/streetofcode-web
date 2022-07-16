import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {CourseProgressOverview} from '../../types'

const P = 'courseProgress'

export const mutationKeys = {
  resetLecture: (lectureId: number) => [P, 'resetLecture', lectureId.toString()],
  updateLecture: (lectureId: number) => [P, 'updateLecture', lectureId.toString()],
}

const queryKeys = {
  get: (courseId: number) => [P, courseId.toString()],
}

const fetchCourseProgressOverview = async (courseId: number) => {
  const response = await Api.authFetch(Api.courseProgressOverviewUrl(courseId))

  if (!response.ok) {
    throw Error('Courses error - TBD')
  }

  return (await response.json()) as CourseProgressOverview
}

const resetLecture = async (lectureId: number) => {
  const result = await Api.authPost(Api.resetProgressUrl(), {lectureId})

  if (!result.ok) {
    throw Error('Courses error - TBD')
  }

  return (await result.json()) as CourseProgressOverview
}

const updateProgressLecture = async (lectureId: number) => {
  const result = await Api.authPost(Api.updateProgressLectureUrl(lectureId))

  if (!result.ok) {
    throw Error('Courses error - TBD')
  }

  return (await result.json()) as CourseProgressOverview
}


export const useGetCourseProgressOverview = (courseId: number) => {
  return useQuery(
    queryKeys.get(courseId),
    () => fetchCourseProgressOverview(courseId), {
      cacheTime: 60000,
      staleTime: 60000,
    })
}

export const useResetLecture = (lectureId: number) => {
  return useMutation(
    mutationKeys.resetLecture(lectureId),
    () => resetLecture(lectureId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(P, data)
      },
    })
}

export const useUpdateProgressLecture = (lectureId: number) => {
  return useMutation(
    mutationKeys.updateLecture(lectureId),
    () => updateProgressLecture(lectureId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(P, data)
      },
    })
}
