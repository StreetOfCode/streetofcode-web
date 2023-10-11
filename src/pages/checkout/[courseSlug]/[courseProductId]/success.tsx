import {useRouter} from 'next/router'
import {useEffect} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../../AuthUserContext'
import {UserAndQueryGuard} from '../../../../QueryGuard'
import * as Api from '../../../../api'
import {useGetCourseOverview} from '../../../../api/courseOverview'
import Loading from '../../../../components/Loading'
import NavBar from '../../../../components/NavBar'
import PageContentWrapper from '../../../../components/PageContentWrapper'
import Flex from '../../../../components/core/Flex'
import Heading from '../../../../components/core/Heading'
import Text from '../../../../components/core/Text'
import CourseCard from '../../../../components/domain/course/CourseCard'
import {device} from '../../../../theme/device'
import {CourseOverview, IsCourseOwnedByUserResponse} from '../../../../types'
import * as Utils from '../../../../utils'

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
  const router = useRouter()

  const {
    courseSlug,
    courseProductId,
    redirect_status: redirectStatus,
  } = router.query

  const {user} = useAuth()
  const getCourseOverview = useGetCourseOverview(courseSlug as string, true)

  usePeriodicUserOwnsCourseCheck(getCourseOverview.data)

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
            const price = courseOverview.courseProducts.find(
              (cp) => cp.productId === courseProductId,
            )?.price
            return (
              <>
                <WrapperFlex>
                  <Flex direction="column" alignItems="flex-start" gap="32px">
                    <div>
                      <Text size="large" weight="bold">
                        Informatika 101 - basic verzia
                      </Text>
                      <Heading variant="h4">
                        {price ? `${price / 100}€` : 'N/A'}
                      </Heading>
                    </div>
                    {redirectStatus === 'succeeded' ? (
                      <>
                        <Loading />
                        <FullWidthText align="center">
                          Spracovávam platbu, o chvíľu ťa presmerujeme na kurz.
                        </FullWidthText>
                      </>
                    ) : (
                      <p>Nastala neočakávaná chyba: {redirectStatus}</p>
                    )}
                  </Flex>
                  <CardFlex direction="column">
                    {/* <h1>{courseOverview.name}</h1> */}
                    <CourseCard course={courseOverview} />
                  </CardFlex>
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
  @media ${device.S} {
    flex-direction: column;
    gap: 32px;
  }
`

const CardFlex = styled(Flex)`
  width: 300px;
  align-self: flex-end;

  @media ${device.S} {
    align-self: center;
    width: 100%;
    order: 1;
  }
`

const FullWidthText = styled(Text)`
  width: 100%;
`

export default CheckoutSuccessPage
