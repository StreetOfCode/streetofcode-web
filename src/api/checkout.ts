import {Stripe} from '@stripe/stripe-js'
import {useQuery} from 'react-query'
import * as Api from '../api'
import {CreatePaymentIntentResponse} from '../types'
import {assert} from '../utils'

const P = 'checkout'

export const queryKeys = {
  createPaymentIntent: (courseProductId: string) => [
    P,
    'createPaymentIntent',
    courseProductId,
  ],
  getPaymentIntent: (clientSecret: string) => [
    P,
    'getPaymentIntent',
    clientSecret,
  ],
}

const createPaymentIntent = async (courseProductId: string) => {
  const response = await Api.authPost(Api.stripeCreatePaymentIntentUrl(), {
    courseProductId,
  })

  if (!response.ok) {
    throw Error('Nepodarilo sa nainicializovať platbu')
  }

  return (await response.json()) as CreatePaymentIntentResponse
}

const getPaymentIntent = async (
  stripe: Stripe | null,
  clientSecret: string,
) => {
  assert(stripe != null, 'Stripe is null')
  const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)
  return paymentIntent
}

export const useCreatePaymentIntent = (courseProductId: string) => {
  return useQuery(queryKeys.createPaymentIntent(courseProductId), () =>
    createPaymentIntent(courseProductId),
  )
}

export const useGetPaymentIntent = (
  stripe: Stripe | null,
  clientSecret: string,
  enabled: boolean,
) => {
  return useQuery(
    queryKeys.getPaymentIntent(clientSecret),
    () => getPaymentIntent(stripe, clientSecret),
    {enabled},
  )
}
