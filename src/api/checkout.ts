import {Stripe} from '@stripe/stripe-js'
import {useMutation, useQuery} from 'react-query'
import * as Api from '../api'
import {
  CreatePaymentIntentResponse,
  UpdatePaymentIntentResponse,
} from '../types'
import {assert} from '../utils'
import queryClient from '../queryClient'

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

export const mutationKeys = {
  updatePaymentIntent: (paymentIntentId: string) => [
    P,
    'updatePaymentIntent',
    paymentIntentId,
  ],
}

const updatePaymentIntent = async (
  paymentIntentId: string,
  promoCode: string | null,
): Promise<UpdatePaymentIntentResponse> => {
  const response = await Api.authPost(Api.stripeUpdatePaymentIntentUrl(), {
    paymentIntentId,
    promoCode,
  })

  if (!response.ok) {
    throw Error('Nepodarilo sa upraviť platbu')
  }

  return (await response.json()) as UpdatePaymentIntentResponse
}

const createPaymentIntent = async (
  courseProductId: string,
): Promise<CreatePaymentIntentResponse> => {
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

export const useUpdatePaymentIntent = (
  paymentIntentId: string,
  courseProductId: string,
) => {
  return useMutation(
    mutationKeys.updatePaymentIntent(paymentIntentId),
    (promoCode: string | null) =>
      updatePaymentIntent(paymentIntentId, promoCode),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          queryKeys.createPaymentIntent(courseProductId),
          data,
        )
      },
    },
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
