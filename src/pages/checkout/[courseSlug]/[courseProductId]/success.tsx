import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../../AuthUserContext'
import {UserAndQueryGuard} from '../../../../QueryGuard'
import * as Api from '../../../../api'
import {
  queryKeys as courseOverviewQueryKeys,
  useGetCourseOverview,
} from '../../../../api/courseOverview'
import Loading from '../../../../components/Loading'
import NavBar from '../../../../components/NavBar'
import PageContentWrapper from '../../../../components/PageContentWrapper'
import Flex from '../../../../components/core/Flex'
import Heading from '../../../../components/core/Heading'
import Text from '../../../../components/core/Text'
import CourseCard from '../../../../components/domain/course/CourseCard'
import {getCourseProductName} from '../../../../constants'
import queryClient from '../../../../queryClient'
import {device} from '../../../../theme/device'
import {CourseOverview, IsCourseOwnedByUserResponse} from '../../../../types'
import * as Utils from '../../../../utils'

const useQueryParams = () => {
  const router = useRouter()
  const {
    courseSlug: _courseSlug,
    courseProductId: _courseProductId,
    appliedPromoCode: _appliedPromoCode,
    finalAmount: _finalAmount,
    redirect_status: _redirectStatus,
  } = router.query

  // on first render router.query content is empty
  const courseSlug = _courseSlug || ''
  const courseProductId = _courseProductId || ''
  const appliedPromoCode = _appliedPromoCode || ''
  const finalAmount = _finalAmount || ''
  const redirectStatus = _redirectStatus || ''

  Utils.assert(typeof courseSlug === 'string', 'Invalid query params')
  Utils.assert(typeof courseProductId === 'string', 'Invalid query params')
  Utils.assert(typeof appliedPromoCode === 'string', 'Invalid query params')
  Utils.assert(typeof courseProductId === 'string', 'Invalid query params')
  Utils.assert(typeof finalAmount === 'string', 'Invalid query params')

  return {
    courseSlug,
    courseProductId,
    appliedPromoCode,
    finalAmount,
    redirectStatus,
  }
}

const usePeriodicUserOwnsCourseCheck = (
  courseOverview: CourseOverview | undefined,
) => {
  const router = useRouter()

  useEffect(() => {
    const fetchOwnsCourse = async () => {
      if (courseOverview == null) return

      const isOwnedByUserResponse = await Api.authFetch(
        Api.isCourseOwnedByUserUrl(courseOverview.id),
      )
      if (isOwnedByUserResponse.ok) {
        const {isOwnedByUser} =
          (await isOwnedByUserResponse.json()) as IsCourseOwnedByUserResponse

        if (isOwnedByUser) {
          await queryClient.invalidateQueries(
            courseOverviewQueryKeys.get(courseOverview.slug),
          )

          const url = Utils.getTakeCourseUrl(courseOverview)
          router.replace({pathname: url})
        }
      }
    }
    const interval = setInterval(() => fetchOwnsCourse(), 2000)
    return () => clearInterval(interval)
  }, [courseOverview, router])
}

const CheckoutSuccessPage = () => {
  const {
    courseSlug,
    courseProductId,
    redirectStatus,
    appliedPromoCode,
    finalAmount,
  } = useQueryParams()

  const {user} = useAuth()
  const getCourseOverview = useGetCourseOverview(courseSlug as string, true)

  usePeriodicUserOwnsCourseCheck(getCourseOverview.data)

  if (!courseSlug || !courseProductId || !redirectStatus || !finalAmount) {
    return <Loading />
  }

  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <UserAndQueryGuard
          user={user}
          fallbackData={null}
          {...getCourseOverview}
        >
          {(courseOverview) => {
            return (
              <>
                <WrapperFlex>
                  <Flex direction="column" alignItems="center" gap="32px">
                    <Heading variant="h3" align="center">
                      {getCourseProductName(courseProductId)}
                    </Heading>
                    <Heading variant="h4">
                      Zaplatené: {parseInt(finalAmount, 10) / 100}€
                    </Heading>
                    {appliedPromoCode && (
                      <Text>Promokód: {appliedPromoCode}</Text>
                    )}
                    {redirectStatus === 'succeeded' ? (
                      <>
                        <Loading />
                        <InfoText align="center">
                          Spracovávam platbu, o chvíľu ťa presmerujeme na kurz.
                          Ak to trvá dlho, tak skús obnoviť stránku, alebo ísť
                          znova na kurzovú stránku a spustiť kurz. Ak by platba
                          neprešla, tak nás kontaktuj na info@streetofcode.sk
                        </InfoText>
                      </>
                    ) : (
                      <p>Nastala neočakávaná chyba: {redirectStatus}</p>
                    )}
                  </Flex>
                  <StyledCoursedCard course={courseOverview} />
                </WrapperFlex>
              </>
            )
          }}
        </UserAndQueryGuard>
      </PageContentWrapper>
    </>
  )
}

const WrapperFlex = styled(Flex)`
  justify-content: center;
  gap: 64px;
  @media ${device.M} {
    flex-direction: column;
    gap: 32px;
  }
`
const StyledCoursedCard = styled(CourseCard)`
  @media ${device.M} {
    display: none;
  }
`

const InfoText = styled(Text)`
  max-width: 500px;
`

export default CheckoutSuccessPage
