import React from 'react'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {routes} from '../../../routes'
import {CourseOverview} from '../../../types'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'

type Variant = 'hero' | 'pricing' | 'finalCta' | 'sticky'

type Props = {
  courseOverview: CourseOverview
  variant?: Variant
  showPrice?: boolean
}

const AiCTAButton: React.FC<Props> = ({
  courseOverview,
  variant = 'hero',
  showPrice = true,
}) => {
  const {user, isLoading} = useAuth()

  if (isLoading) return <Loading />

  const states = Utils.getCourseProductStates(courseOverview, user)
  const price = (courseOverview.courseProducts[0]?.price || 0) / 100
  const productId = courseOverview.courseProducts[0]?.productId
  const continueUrl = Utils.getTakeCourseUrl(courseOverview)

  const getContinueText = () => {
    return courseOverview.userProgressMetadata
      ? 'Pokračovať v kurze'
      : 'Spustiť kurz'
  }

  const getBuyText = () => {
    if (!showPrice) return 'Kúpiť kurz'
    if (variant === 'finalCta') return `Kúpiť kurz za ${price} EUR`
    return `Kúpiť kurz - ${price} EUR`
  }

  const getButtonProps = () => {
    switch (variant) {
      case 'hero':
        return {size: 'large' as const, bold: true}
      case 'pricing':
        return {size: 'very-large' as const, bold: true}
      case 'finalCta':
        return {size: 'very-large' as const, bold: true}
      case 'sticky':
        return {size: 'large' as const, bold: true}
      default:
        return {size: 'large' as const, bold: true}
    }
  }

  const buttonProps = getButtonProps()

  // User owns the course (paid or free)
  if (states.hasActiveProductsAndIsOwnedByUser) {
    return (
      <NextLink href={{pathname: continueUrl, query: {autoplay: 'false'}}}>
        <StyledButton variant="accent" {...buttonProps}>
          {getContinueText()}
        </StyledButton>
      </NextLink>
    )
  }

  // Paid course but user doesn't own it
  if (states.hasActiveProductsButIsNotOwnedByUser) {
    if (!productId) return null
    return (
      <NextLink
        href={routes.checkout.courseProduct(courseOverview.slug, productId)}
      >
        <StyledButton
          variant="accent"
          {...buttonProps}
          iconBefore={
            variant === 'sticky' ? <AiOutlineShoppingCart /> : undefined
          }
        >
          {getBuyText()}
        </StyledButton>
      </NextLink>
    )
  }

  // Free course and user is logged in
  if (states.hasNoActiveProductsAndIsLoggedIn) {
    return (
      <NextLink href={{pathname: continueUrl, query: {autoplay: 'false'}}}>
        <StyledButton variant="accent" {...buttonProps}>
          {getContinueText()}
        </StyledButton>
      </NextLink>
    )
  }

  // Free course but user is not logged in
  if (states.hasNoActiveProductsAndIsNotLoggedIn) {
    return (
      <NextLink
        href={routes.login.redirectUri(
          typeof window !== 'undefined'
            ? encodeURIComponent(location.pathname)
            : '',
        )}
      >
        <StyledButton variant="accent" {...buttonProps}>
          Pre spustenie kurzu sa najprv prihlás
        </StyledButton>
      </NextLink>
    )
  }

  return null
}

const StyledButton = styled(Button)`
  width: 100%;
`

export default AiCTAButton
