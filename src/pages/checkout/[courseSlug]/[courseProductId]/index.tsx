import {
  Elements,
  PaymentElement,
  useStripe as _useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  Appearance,
  StripeElementsOptions,
  StripePaymentElementOptions,
  loadStripe,
} from '@stripe/stripe-js'
import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../../AuthUserContext'
import {QueryGuard} from '../../../../QueryGuard'
import * as Api from '../../../../api'
import {useCreatePaymentIntent} from '../../../../api/checkout'
import Loading from '../../../../components/Loading'
import NavBar from '../../../../components/NavBar'
import PageContentWrapper from '../../../../components/PageContentWrapper'
import Button from '../../../../components/core/Button'
import Flex from '../../../../components/core/Flex'
import Heading from '../../../../components/core/Heading'
import Text from '../../../../components/core/Text'
import CourseCard from '../../../../components/domain/course/CourseCard'
import {useTheme} from '../../../../hooks/useTheme'
import {routes} from '../../../../routes'
import {device} from '../../../../theme/device'
import {CourseOverview} from '../../../../types'
import * as Utils from '../../../../utils'

type Props = {
  courseSlug: string
  courseOverview: CourseOverview
  courseProductId: string
}

// TODO STRIPE - load elsewhere?
// TODO STRIPE - api key to env
const stripePromise = loadStripe(
  'pk_test_51NvKkKEBUaa48153hx7AVAjT4ktEInop7ldq1mqI8kqnt0a06AJcpJ40OiN7vuEZZ4iUdIwhVMwwflWbKgmxutjq00Ipz8ZLQb',
  {
    locale: 'sk',
  },
)

const useStripe = (courseSlug: string, courseProductId: string) => {
  const stripe = _useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${routes.host}${routes.checkout.success(
          courseSlug,
          courseProductId,
        )}`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('Nastala neočakávaná chyba')
    }

    setIsLoading(false)
  }

  const canSubmit = !!stripe && !!elements && !isLoading

  return {message, canSubmit, handleSubmit}
}

const StripeElements = ({
  courseSlug,
  courseProductId,
}: {
  courseSlug: string
  courseProductId: string
}) => {
  const {message, canSubmit, handleSubmit} = useStripe(
    courseSlug,
    courseProductId,
  )

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormFlex direction="column" gap="12px">
        <PaymentElement options={paymentElementOptions} />
        <StyledButton
          variant="accent"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Zaplatiť
        </StyledButton>
        <Text>{message}</Text>
      </FormFlex>
    </form>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
`

const FormFlex = styled(Flex)`
  width: 300px;
`

const Stripe = ({
  courseSlug,
  courseProductId,
}: {
  courseSlug: string
  courseProductId: string
}) => {
  const theme = useTheme()
  const createPaymentIntentQuery = useCreatePaymentIntent(courseProductId)

  return (
    <QueryGuard {...createPaymentIntentQuery}>
      {({clientSecret}) => {
        const appearance: Appearance = {
          theme: theme.isLightTheme ? 'stripe' : 'night',
        }

        const options: StripeElementsOptions = {
          clientSecret,
          appearance,
        }

        return (
          <Elements options={options} stripe={stripePromise}>
            <StripeElements
              courseSlug={courseSlug}
              courseProductId={courseProductId}
            />
          </Elements>
        )
      }}
    </QueryGuard>
  )
}

const CourseCheckoutPage = ({
  courseSlug,
  courseOverview,
  courseProductId,
}: Props) => {
  const {user, isLoading} = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    // this page can be seen only by logged in users
    router.replace({
      pathname: routes.login.redirectUri(encodeURIComponent(location.pathname)),
      query: {
        returnTo: routes.checkout.courseProduct(courseSlug, courseProductId),
      },
    })
  }

  if (Utils.isCourseOwnedByUser(courseOverview)) {
    // course already owned, no need to checkout, redirect to take course
    router.replace(Utils.getTakeCourseUrl(courseOverview))
  }

  const price = courseOverview.courseProducts.find(
    (cp) => cp.productId === courseProductId,
  )?.price

  return (
    <>
      <NavBar />
      <PageContentWrapper>
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
            <Stripe courseSlug={courseSlug} courseProductId={courseProductId} />
          </Flex>
          <CardFlex direction="column">
            {/* <h1>{courseOverview.name}</h1> */}
            <CourseCard course={courseOverview} />
          </CardFlex>
        </WrapperFlex>
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

// TODO stripe - SSR needed? probably not
export const getStaticProps: GetStaticProps = async (context) => {
  const courseSlug = context?.params?.courseSlug as string
  const courseProductId = context?.params?.courseProductId as string

  const response = await Api.noAuthFetch(Api.courseOverviewUrl(courseSlug))

  const courseOverview = response.ok
    ? ((await response.json()) as CourseOverview)
    : null

  return {props: {courseSlug, courseOverview, courseProductId}}
}

export const getStaticPaths = async () => {
  // TODO stripe - Api.courseSlugsAndProductIdsUrl endpoint??
  const response = await Api.noAuthFetch(Api.courseAllProductsUrl())
  const {courseProducts} = (response.ok ? await response.json() : []) as {
    courseProducts: {[s: string]: string[]}
  }

  const paths = [...Object.entries(courseProducts)]
    .map(([slug, products]) =>
      products.map((product) => ({
        params: {
          courseSlug: slug,
          courseProductId: product,
        },
      })),
    )
    .flat()

  return {
    paths,
    fallback: 'blocking',
  }
}

export default CourseCheckoutPage
