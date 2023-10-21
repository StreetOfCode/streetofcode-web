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
import {
  useCreatePaymentIntent,
  useUpdatePaymentIntent,
} from '../../../../api/checkout'
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
import {TERMS_OF_SERVICE_URL, getCourseProductName} from '../../../../constants'
import {useTheme} from '../../../../hooks/useTheme'
import {prefixWithHost, routes} from '../../../../routes'
import {device} from '../../../../theme/device'
import * as Utils from '../../../../utils'
import * as Api from '../../../../api'
import TextField from '../../../../components/core/TextField'
import {IsPromotionCodeValid} from '../../../../types'
import {assert} from '../../../../utils'

const loadStripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || '',
  {
    locale: 'sk',
  },
)

const useStripe = (
  courseSlug: string,
  courseProductId: string,
  appliedPromoCode: string | null,
  finalAmount: number,
) => {
  const stripe = _useStripe()
  const elements = useElements()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsSubmitting(true)

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${routes.host}${routes.checkout.success(
          courseSlug,
          courseProductId,
          appliedPromoCode,
          finalAmount,
        )}`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setIsSubmitting(false)
    }
  }

  const canSubmit = !!stripe && !!elements && !isSubmitting

  return {canSubmit, handleSubmit, isSubmitting}
}

const CheckoutForm = ({
  courseSlug,
  courseProductId,
  fullPriceAmount,
  discountAmount,
  appliedPromoCode,
  paymentIntentId,
}: {
  courseSlug: string
  courseProductId: string
  fullPriceAmount: number
  discountAmount: number | null
  appliedPromoCode: string | null
  paymentIntentId: string
}) => {
  const finalAmount = fullPriceAmount - (discountAmount || 0)
  assert(finalAmount >= 0, 'Invalid price')

  const {canSubmit, handleSubmit, isSubmitting} = useStripe(
    courseSlug,
    courseProductId,
    appliedPromoCode,
    finalAmount,
  )
  const [isStripeLoading, setIsStripeLoading] = useState(true)
  const [areTosAccepted, setAreTosAccepted] = useState(true)
  const [isReturnPolicyAccepted, setIsReturnPolicyAccepted] = useState(true)
  const [promoCode, setPromoCode] = useState(appliedPromoCode || '')
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null)
  const [validatingPromoCode, setValidatingPromoCode] = useState(false)
  const updatePaymentIntentMutation = useUpdatePaymentIntent(
    paymentIntentId,
    courseProductId,
  )

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  }

  const onPromoCodeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validatingPromoCode) {
      setPromoCode(e.target.value)
      setPromoCodeError(null)
    }
  }

  const removePromoCode = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPromoCode('')
    setPromoCodeError(null)
    setValidatingPromoCode(true)
    // reset paymentIntent with original amount
    await updatePaymentIntentMutation.mutateAsync(null)
    setValidatingPromoCode(false)
  }

  const usePromoCode = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setValidatingPromoCode(true)

    const response = await Api.authFetch(
      Api.stripeIsPromotionCodeValidUrl(promoCode),
    )

    if (!response.ok) {
      throw Error('Nepodarilo sa overiť promo kód')
    }

    const isValidResponse = (await response.json()) as IsPromotionCodeValid
    if (isValidResponse.isPromotionCodeValid) {
      setPromoCodeError(null)

      if (isValidResponse.validForCourseProductId?.includes(courseProductId)) {
        await updatePaymentIntentMutation.mutateAsync(promoCode)
      } else {
        // create error message with promoCode bold
        setPromoCodeError(
          `Promo kód ${promoCode} nie je uplatniteľný na tento kurz`,
        )
      }
    } else {
      setPromoCode('')
      setPromoCodeError(`Neplatný promo kód ${promoCode}`)
    }

    setValidatingPromoCode(false)
  }

  return (
    <form>
      <FormFlex direction="column" gap="12px">
        {isStripeLoading && <Loading />}
        <StyledPaymentElement
          options={paymentElementOptions}
          onLoaderStart={() => setIsStripeLoading(false)}
        />
        <Flex justifyContent="space-between" alignSelf="stretch" gap="12px">
          <TextField
            label="Zľavový kód"
            text={appliedPromoCode || promoCode}
            onTextChanged={onPromoCodeChanged}
            disabled={validatingPromoCode || appliedPromoCode != null}
            disableMultiline
          />
          <Button
            variant="accent"
            onClick={usePromoCode}
            disabled={
              appliedPromoCode != null ||
              validatingPromoCode ||
              promoCode.trim() === ''
            }
          >
            Použiť
          </Button>
        </Flex>
        {promoCodeError && <Text>{promoCodeError}</Text>}
        {!promoCodeError &&
          appliedPromoCode &&
          discountAmount &&
          (discountAmount || 0) > 0 && (
            <Flex justifyContent="center" gap="8px">
              <Text>
                Promo kód <b>{appliedPromoCode}</b> uplatnený. Zľava{' '}
                <b>{discountAmount / 100}€</b>
              </Text>
              <RemovePromoCodeButton
                size="small"
                onClick={removePromoCode}
                disabled={validatingPromoCode}
              >
                Odstrániť
              </RemovePromoCodeButton>
            </Flex>
          )}
        <Heading variant="h4">
          {finalAmount ? `${finalAmount / 100}€` : 'N/A'}
        </Heading>
        <CheckBox
          size="24px"
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
          size="24px"
          label={`Odoslaním objednávky súhlasím so začatím kurzu a potvrdzujem,
                že som bol poučený o tom, že týmto strácam právo odstúpiť od
                zmluvy.`}
          checked={isReturnPolicyAccepted}
          onToggle={() => setIsReturnPolicyAccepted(!isReturnPolicyAccepted)}
        />
        {isSubmitting || validatingPromoCode ? (
          <Loading />
        ) : (
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
        )}
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
      {({
        clientSecret,
        fullAmount,
        discountAmount,
        promoCode,
        paymentIntentId,
      }) => {
        const appearance: Appearance = {
          theme: theme.isLightTheme ? 'stripe' : 'night',
        }

        const options: StripeElementsOptions = {
          clientSecret,
          appearance,
        }

        return (
          <Elements options={options} stripe={loadStripePromise}>
            <CheckoutForm
              courseSlug={courseSlug}
              courseProductId={courseProductId}
              fullPriceAmount={fullAmount}
              discountAmount={discountAmount}
              appliedPromoCode={promoCode}
              paymentIntentId={paymentIntentId}
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

  const getCourseOverview = useGetCourseOverview(
    courseSlug,
    !!courseSlug && !!user,
  )

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
              <Flex direction="column" alignItems="center" gap="32px">
                <Heading variant="h4">
                  {getCourseProductName(courseProductId)}
                </Heading>
                <WrapperFlex gap="64px">
                  <Stripe
                    courseSlug={courseSlug as string}
                    courseProductId={courseProductId as string}
                  />
                  <StyledCourseCard course={courseOverview} />
                </WrapperFlex>
              </Flex>
            </PageContentWrapper>
          </>
        )
      }}
    </QueryGuard>
  )
}

const WrapperFlex = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
    gap: 32px;
  }
`

const StyledCourseCard = styled(CourseCard)`
  @media ${device.M} {
    display: none;
  }
`

const RemovePromoCodeButton = styled(Button)``

const InlineLink = styled(NextLink)`
  display: inline-block;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const FormFlex = styled(Flex)`
  gap: 16px;
  max-width: 400px;
`

const StyledPaymentElement = styled(PaymentElement)`
  width: 100%;
  margin-bottom: 16px;
`

export default CourseCheckoutPage
