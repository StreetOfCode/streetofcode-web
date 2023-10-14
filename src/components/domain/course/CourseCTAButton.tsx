import React from 'react'
import {User} from 'firebase/auth'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview} from '../../../types'
import Loading from '../../Loading'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import Text from '../../core/Text'
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

  const states = {
    hasProductsAndIsOwnedByUser: hasProducts && ownedByUser,
    hasProductsButIsNotOwnedByUser: hasProducts && !ownedByUser,
    hasNoProductsAndIsLoggedIn: !hasProducts && user,
    hasNoProductsAndIsNotLoggedIn: !hasProducts && !user,
  }

  if (states.hasProductsAndIsOwnedByUser) {
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
  } else if (states.hasProductsButIsNotOwnedByUser) {
    return (
      <a href="#products" style={{alignSelf: 'stretch'}}>
        <StyledButton variant="accent" disableHoverTransform>
          Kúpiť kurz
        </StyledButton>
      </a>
    )
  } else if (states.hasNoProductsAndIsLoggedIn) {
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
  } else if (states.hasNoProductsAndIsNotLoggedIn) {
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
  } else {
    return <Text>Niekde nastala chyba</Text>
  }
}

const StyledButton = styled(Button)`
  width: 100%;
`

export default CourseCTAButton
