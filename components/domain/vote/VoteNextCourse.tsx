import React, {useEffect, useState} from 'react'
import {useGetNextCourseOptions} from '../../api/voteNextCourse'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3'
import {QueryGuard} from '../../../QueryGuard'
import {VoteNextCoursesRequest} from '../../../types'
import Button from '../../core/Button'
import * as Api from '../../../api'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {device} from '../../../theme/device'

const nextCourseVotedStorageKey = 'nextCourseVoted'

type VoteStatus = 'NOT_VOTED' | 'VOTE_JUST_SUBMITTED' | 'ALREADY_VOTED'

const VoteNextCourse = () => {
  const [selectedNextCourses, setSelectedNextCourses] = useState<number[]>([])
  const {user, isLoading} = useAuth()
  const [voteStatus, setVoteStatus] = useState<VoteStatus>('ALREADY_VOTED')
  const getVoteNextCourse = useGetNextCourseOptions()
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const {executeRecaptcha} = useGoogleReCaptcha()

  useEffect(() => {
    // TODO create service for localStorage
    if (localStorage.getItem(nextCourseVotedStorageKey) != null) {
      setVoteStatus('ALREADY_VOTED')
    } else {
      setVoteStatus('NOT_VOTED')
    }
  }, [])

  const handleOnSelected = (nextCourseVoteId: number) => {
    if (selectedNextCourses.includes(nextCourseVoteId)) {
      setSelectedNextCourses(
        selectedNextCourses.filter((id) => id !== nextCourseVoteId),
      )
    } else {
      setSelectedNextCourses(selectedNextCourses.concat([nextCourseVoteId]))
    }
  }

  const handleOnSubmit = async () => {
    if (selectedNextCourses.length === 0) return

    setSubmitLoading(true)

    if (!user && executeRecaptcha) {
      const token = await executeRecaptcha('vote')
      await Api.authPost<VoteNextCoursesRequest>(Api.voteNextUrl(), {
        courseVoteOptionIds: selectedNextCourses,
        recaptchaToken: token,
      })
    } else {
      await Api.authPost<VoteNextCoursesRequest>(Api.voteNextUrl(), {
        courseVoteOptionIds: selectedNextCourses,
      })
    }

    if (!user) {
      localStorage.setItem(nextCourseVotedStorageKey, 'true')
    }

    setSubmitLoading(false)
    setVoteStatus('VOTE_JUST_SUBMITTED')
  }

  if (isLoading) return <Loading />

  if (voteStatus === 'VOTE_JUST_SUBMITTED') {
    return (
      <Text align="center" style={{alignSelf: 'center'}}>
        Ďakujeme, tvoj hlas bol zarátaný.
      </Text>
    )
  } else if (voteStatus === 'ALREADY_VOTED') {
    return null
  } else {
    return (
      <QueryGuard {...getVoteNextCourse}>
        {(nextCourseOptions) =>
          nextCourseOptions.length > 0 ? (
            <Flex direction="column" gap="22px" alignSelf="center">
              <Text align="center">
                Keď chceš, aby sme spravili dáky kurz, tak zahlasuj a možno (ale
                len možno) budeš vypočutý/á!
              </Text>
              <CourseOptionsWrapper>
                {nextCourseOptions.map((courseOption) => (
                  <CourseOptionButton
                    key={courseOption.id}
                    onClick={() => handleOnSelected(courseOption.id)}
                    selected={selectedNextCourses.includes(courseOption.id)}
                  >
                    {courseOption.name}
                  </CourseOptionButton>
                ))}
              </CourseOptionsWrapper>
              <Button
                variant="accent"
                onClick={handleOnSubmit}
                disabled={selectedNextCourses.length === 0 || submitLoading}
              >
                Odoslať
              </Button>
            </Flex>
          ) : null
        }
      </QueryGuard>
    )
  }
}

const CourseOptionButton = styled(Button)<{selected: boolean}>`
  border-color: ${(props) => props.selected && props.theme.accentColor};
  color: ${(props) => props.selected && props.theme.accentColor};

  transition: 100ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 100ms ease-in-out;
  }
`

const CourseOptionsWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export default VoteNextCourse
