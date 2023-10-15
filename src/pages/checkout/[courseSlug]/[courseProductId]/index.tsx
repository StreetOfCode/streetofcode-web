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
import {useRouter} from 'next/router'
import React, {MouseEventHandler, useState} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../../AuthUserContext'
import {QueryGuard} from '../../../../QueryGuard'
import {useCreatePaymentIntent} from '../../../../api/checkout'
import {useGetCourseOverview} from '../../../../api/courseOverview'
import Head from '../../../../components/Head'
import Loading from '../../../../components/Loading'
import NavBar from '../../../../components/NavBar'
import PageContentWrapper from '../../../../components/PageContentWrapper'
import Button from '../../../../components/core/Button'
import CheckBox from '../../../../components/core/CheckBox'
import Flex from '../../../../components/core/Flex'
import Heading from '../../../../components/core/Heading'
import NextLink from '../../../../components/core/NextLink'
import Text from '../../../../components/core/Text'
import CourseCard from '../../../../components/domain/course/CourseCard'
import {TERMS_OF_SERVICE_URL} from '../../../../constants'
import {useTheme} from '../../../../hooks/useTheme'
import {prefixWithHost, routes} from '../../../../routes'
import {device} from '../../../../theme/device'
import * as Utils from '../../../../utils'

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

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
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

const CheckoutForm = ({
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

  const [isStripeLoading, setIsStripeLoading] = useState(true)
  const [areTosAccepted, setAreTosAccepted] = useState(false)
  const [isReturnPolicyAccepted, setIsReturnPolicyAccepted] = useState(false)

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  }

  return (
    <form>
      <FormFlex direction="column" gap="12px">
        {isStripeLoading && <Loading />}
        <StyledPaymentElement
          options={paymentElementOptions}
          onLoaderStart={() => setIsStripeLoading(false)}
        />
        <CheckBox
          labelComponent={
            <Text>
              Súhlasím s{' '}
              <InlineLink href={TERMS_OF_SERVICE_URL} blankTarget>
                <Text
                  onClick={(e) => {
                    // stop event propagation so that click isn't picked by up Checkbox
                    // which would toggle the checkbox instead
                    e.stopPropagation()
                  }}
                  withAccentUnderline
                >
                  obchodnými podmienkami.
                </Text>
              </InlineLink>
            </Text>
          }
          checked={areTosAccepted}
          onToggle={() => setAreTosAccepted(!areTosAccepted)}
        />
        <CheckBox
          label={`Odoslaním objednávky súhlasíte so začatím kurzu a potvrdzujete,
                že ste boli poučený o tom, že týmto strácate právo odstúpiť od
                zmluvy.`}
          checked={isReturnPolicyAccepted}
          onToggle={() => setIsReturnPolicyAccepted(!isReturnPolicyAccepted)}
        />
        <StyledButton
          variant="accent"
          disabled={
            !canSubmit ||
            !areTosAccepted ||
            !isReturnPolicyAccepted ||
            isStripeLoading
          }
          onClick={handleSubmit}
        >
          Zaplatiť
        </StyledButton>
        <Text>{message}</Text>
      </FormFlex>
    </form>
  )
}

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
            <CheckoutForm
              courseSlug={courseSlug}
              courseProductId={courseProductId}
            />
          </Elements>
        )
      }}
    </QueryGuard>
  )
}

const useQueryParams = () => {
  const router = useRouter()
  const {courseSlug: _courseSlug, courseProductId: _courseProductId} =
    router.query

  // on first render router.query content is empty
  const courseSlug = _courseSlug || ''
  const courseProductId = _courseProductId || ''

  Utils.assert(typeof courseSlug === 'string', 'Invalid query params')
  Utils.assert(typeof courseProductId === 'string', 'Invalid query params')

  return {
    courseSlug,
    courseProductId,
  }
}

const CourseCheckoutPage = () => {
  const {user, isLoading} = useAuth()
  const router = useRouter()

  const {courseSlug, courseProductId} = useQueryParams()

  const getCourseOverview = useGetCourseOverview(courseSlug, !!courseSlug)

  if (isLoading || !courseSlug || !courseProductId) {
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

  if (
    getCourseOverview.data &&
    Utils.isCourseOwnedByUser(getCourseOverview.data)
  ) {
    // course already owned, no need to checkout, redirect to take course
    router.replace(Utils.getTakeCourseUrl(getCourseOverview.data))
  }

  return (
    <QueryGuard {...getCourseOverview}>
      {(courseOverview) => {
        const price = courseOverview.courseProducts.find(
          (cp) => cp.productId === courseProductId,
        )?.price

        return (
          <>
            <Head
              title={`Checkout | ${courseOverview.name} | Street of Code`}
              description={`Checkout | ${courseOverview.name}`}
              url={prefixWithHost(
                routes.checkout.courseProduct(
                  courseOverview.slug,
                  courseProductId,
                ),
              )}
              imageUrl={courseOverview.iconUrl}
            />
            <NavBar />
            <PageContentWrapper>
              <WrapperFlex>
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  gap="32px"
                  style={{width: 400}}
                >
                  <div>
                    <Text size="large" weight="bold">
                      Informatika 101 - basic verzia
                    </Text>
                    <Heading variant="h4">
                      {price ? `${price / 100}€` : 'N/A'}
                    </Heading>
                  </div>
                  <Stripe
                    courseSlug={courseSlug as string}
                    courseProductId={courseProductId as string}
                  />
                </Flex>
                <CardFlex direction="column">
                  <CourseCard course={courseOverview} />
                </CardFlex>
              </WrapperFlex>
            </PageContentWrapper>
          </>
        )
      }}
    </QueryGuard>
  )
}

const WrapperFlex = styled(Flex)`
  align-content: center;
  justify-content: center;
  gap: 64px;
  @media ${device.S} {
    flex-direction: column;
    gap: 32px;
  }
`

const CardFlex = styled(Flex)`
  width: 300px;
  align-self: center;

  @media ${device.S} {
    align-self: center;
    width: 100%;
    order: 1;
  }
`

const InlineLink = styled(NextLink)`
  display: inline-block;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const FormFlex = styled(Flex)`
  gap: 16px;
  width: 400px;
`

const StyledPaymentElement = styled(PaymentElement)`
  width: 100%;
  margin-bottom: 16px;
`

export default CourseCheckoutPage
