import React from 'react'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview, CourseProduct} from '../../../types'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'

type Props = {
  course: CourseOverview
}

const config = {
  javaKurzSlug:
    process.env.NEXT_PUBLIC_COURSE_PRODUCT_SLUG_JAVA_KURZ || 'java-kurz',
  javaKurzProductIdBasic:
    process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_JAVA_KURZ_BASIC ||
    'prod_Okkl9b2kAZHqJA',
  javaKurzProductIdPro:
    process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_JAVAKURZ_SLUG ||
    'prod_OkklGrYeJgDOg4',
}

const JavaKurzCourseProducts = ({course}: Props) => {
  const COURSE_PRODUCT_NAMES: Record<string, string> = {
    [config.javaKurzProductIdBasic]: 'Základný kurz',
    [config.javaKurzProductIdPro]: 'PRO',
  }

  const CourseProduct = ({courseProduct}: {courseProduct: CourseProduct}) => {
    const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)

    return (
      <Flex direction="column" style={{padding: 20}}>
        <div>{COURSE_PRODUCT_NAMES[courseProduct.productId] || 'N/A'}</div>
        <div>{courseProduct.price / 100}€</div>
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
            <StyledButton variant="accent" disableHoverTransform>
              Kúpiť
            </StyledButton>
          </NextLink>
        )}
      </Flex>
    )
  }

  return (
    <Flex id="products">
      {course.courseProducts.map((cp) => (
        <CourseProduct key={cp.productId} courseProduct={cp} />
      ))}
    </Flex>
  )
}

const CourseProducts = ({course}: Props) => {
  if (course.slug === config.javaKurzSlug) {
    return <JavaKurzCourseProducts course={course} />
  } else {
    return <></>
  }
}

const StyledButton = styled(Button)`
  width: 100%;
`

export default CourseProducts
