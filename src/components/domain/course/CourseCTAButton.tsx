import React from 'react'
import {User} from 'firebase/auth'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview} from '../../../types'
import Loading from '../../Loading'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'

type Props = {
  user: User | null
  isLoading: boolean
  continueUrl: string
  courseOverview: CourseOverview
}

const CourseCTAButton = ({
  user,
  isLoading,
  continueUrl,
  courseOverview,
}: Props) => {
  if (isLoading) return <Loading />

  const hasProducts = courseOverview.courseProducts.length !== 0
  const ownedByUser = Utils.isCourseOwnedByUser(courseOverview)

  if (hasProducts) {
    if (ownedByUser) {
      return (
        <NextLink
          href={{pathname: continueUrl, query: {autoplay: 'false'}}}
          alignSelf="stretch"
        >
          <StyledButton variant="accent" disableHoverTransform>
            {courseOverview.userProgressMetadata
              ? 'Pokračovať v kurze'
              : 'Spustiť kurz'}
          </StyledButton>
        </NextLink>
      )
    }

    return (
      <a href="#products" style={{alignSelf: 'stretch'}}>
        <StyledButton variant="accent" disableHoverTransform>
          Kúpiť kurz
        </StyledButton>
      </a>
    )
  } else {
    if (user) {
      return (
        <NextLink
          href={{pathname: continueUrl, query: {autoplay: 'false'}}}
          alignSelf="stretch"
        >
          <StyledButton variant="accent" disableHoverTransform>
            {courseOverview.userProgressMetadata
              ? 'Pokračovať v kurze'
              : 'Spustiť kurz'}
          </StyledButton>
        </NextLink>
      )
    } else {
      return (
        <NextLink
          href={routes.login.redirectUri(encodeURIComponent(location.pathname))}
          alignSelf="stretch"
        >
          <StyledButton variant="accent">
            Pre spustenie kurzu sa najprv prihlás
          </StyledButton>
        </NextLink>
      )
    }
  }
}

const StyledButton = styled(Button)`
  width: 100%;
`

export default CourseCTAButton
