import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {CourseProgressOverview} from '../../types'
import {queryKeys as courseQueryKeys} from './courses'
import {queryKeys as courseOverviewQueryKeys} from './courseOverview'

const P = 'courseProgress'

export const mutationKeys = {
  resetLecture: () => [P, 'resetLecture'],
  updateLecture: () => [P, 'updateLecture'],
}

const queryKeys = {
  get: (courseId: number) => [P, courseId.toString()],
}

const fetchCourseProgressOverview = async (courseId: number) => {
  const response = await Api.authFetch(Api.courseProgressOverviewUrl(courseId))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať priebeh kurzu')
  }

  return (await response.json()) as CourseProgressOverview
}

const resetLecture = async (lectureId: number) => {
  const result = await Api.authPost(Api.resetProgressUrl(), {lectureId})

  if (!result.ok) {
    throw Error('Nepodarilo sa resetnúť priebeh lekcie')
  }

  return (await result.json()) as CourseProgressOverview
}

const updateProgressLecture = async (lectureId: number) => {
  const result = await Api.authPost(Api.updateProgressLectureUrl(lectureId))

  if (!result.ok) {
    throw Error('Nepodarilo sa aktualizovať priebeh lekcie')
  }

  return (await result.json()) as CourseProgressOverview
}

export const useGetCourseProgressOverview = (courseId: number) => {
  return useQuery(queryKeys.get(courseId), () =>
    fetchCourseProgressOverview(courseId),
  )
}

export const useResetLecture = (courseId: number, courseSlug: string) => {
  return useMutation(
    mutationKeys.resetLecture(),
    (lectureId: number) => resetLecture(lectureId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(queryKeys.get(courseId), data)

        Promise.all(
          [
            courseQueryKeys.getCourses,
            courseOverviewQueryKeys.get(courseSlug),
          ].map((key) => queryClient.invalidateQueries(key)),
        )
      },
    },
  )
}

export const useUpdateProgressLecture = (
  courseId: number,
  courseSlug: string,
) => {
  return useMutation(
    mutationKeys.updateLecture(),
    (lectureId: number) => updateProgressLecture(lectureId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(queryKeys.get(courseId), data)

        Promise.all(
          [
            courseQueryKeys.getCourses,
            courseOverviewQueryKeys.get(courseSlug),
          ].map((key) => queryClient.invalidateQueries(key)),
        )
      },
    },
  )
}
