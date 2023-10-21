import React from 'react'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview, CourseProduct} from '../../../types'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'
import {courseProductsConfig, getCourseProductName} from '../../../constants'
import Text from '../../core/Text'

type Props = {
  course: CourseOverview
}

const JavaKurzCourseProducts = ({course}: Props) => {
  const buyableUntil =
    process.env.NEXT_PUBLIC_COURSE_PRODUCT_BUYABLE_UNTIL_JAVA_KURZ || ''
  const isBuyable = new Date(buyableUntil) > new Date()

  const CourseProduct = ({courseProduct}: {courseProduct: CourseProduct}) => {
    const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)

    return (
      <Flex direction="column" style={{padding: 20}}>
        <div>{getCourseProductName(courseProduct.productId) || 'N/A'}</div>
        <div>
          {courseProduct.price != null
            ? `${courseProduct.price / 100}€`
            : 'N/A'}
        </div>
        {isCourseOwnedByUser && <div>Tento kurz už vlastníš</div>}
        {!isCourseOwnedByUser && (
          <NextLink
            href={{
              pathname: routes.checkout.courseProduct(
                course.slug,
                courseProduct.productId,
              ),
            }}
            alignSelf="stretch"
          >
            <StyledButton
              variant="accent"
              disableHoverTransform
              disabled={courseProduct.price == null || !isBuyable}
            >
              Kúpiť
            </StyledButton>
          </NextLink>
        )}
      </Flex>
    )
  }

  return (
    <>
      <Flex id="products">
        {course.courseProducts.map((cp) => (
          <CourseProduct key={cp.productId} courseProduct={cp} />
        ))}
      </Flex>
      {!isBuyable && (
        <Text align="center">
          Predpredaj skončil. Kurz bude opäť dostupný od 1.1.2024.
        </Text>
      )}
    </>
  )
}

const CourseProducts = ({course}: Props) => {
  if (course.slug === courseProductsConfig.javaKurz.slug) {
    return <JavaKurzCourseProducts course={course} />
  } else {
    return <></>
  }
}

const StyledButton = styled(Button)`
  width: 100%;
`

export default CourseProducts
