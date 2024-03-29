import {useRouter} from 'next/router'
import React, {ChangeEvent, HTMLAttributes, useState} from 'react'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3'
import {AiOutlineSend} from 'react-icons/ai'
import styled from 'styled-components'
import {addToNewsletter, authPost} from '../../../api'
import {device} from '../../../theme/device'
import {
  AddToNewsletterRequest,
  SocUser,
  SubscribedFromType,
} from '../../../types'
import {emailRegex} from '../../../utils'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import TextField from '../../core/TextField'
import {GDPR_URL} from '../../../constants'

type Props = {
  className?: string
  user?: SocUser
  removeHeading?: boolean
  from: SubscribedFromType
} & HTMLAttributes<HTMLElement>

const NewsletterForm = ({
  className,
  user,
  removeHeading,
  from,
  ...props
}: Props) => {
  const {executeRecaptcha} = useGoogleReCaptcha()
  const [newsletterEmail, setNewsletterEmail] = useState<string>(
    user?.email || '',
  )
  const [nesletterError, setNewsletterError] = useState('')
  const [newsletterUpdatedSuccess, setNewsletterUpdatedSuccess] =
    useState<boolean>(false)
  const [newsletterUpdatedFailure, setNewsletterUpdatedFailure] =
    useState<boolean>(false)
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false)
  const router = useRouter()

  const onNewsletterChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value)
    setNewsletterError('')
  }

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!newsletterEmail.trimEnd()) {
      setNewsletterError('Email je prázdny')
      return
    } else if (!emailRegex.test(newsletterEmail)) {
      setNewsletterError('Email má nesprávny formát')
      return
    }

    try {
      setNewsletterLoading(true)

      let result: Response | undefined

      if (!user && executeRecaptcha) {
        const token = await executeRecaptcha('newsletter')

        result = await authPost<AddToNewsletterRequest>(addToNewsletter(), {
          email: newsletterEmail,
          recaptchaToken: token,
          subscribedFrom: from,
          fromPath: from === 'NEWSLETTER_MODAL' ? router.asPath : undefined,
        })
      } else {
        result = await authPost<AddToNewsletterRequest>(addToNewsletter(), {
          email: newsletterEmail,
          subscribedFrom: from,
        })
      }

      if (!result.ok) {
        setNewsletterUpdatedFailure(true)
      } else {
        setNewsletterUpdatedSuccess(true)
      }
    } catch (err) {
      setNewsletterUpdatedFailure(true)
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <Wrapper className={className} {...props}>
      {!newsletterUpdatedSuccess && !newsletterUpdatedFailure && (
        <form>
          <Flex direction="column" gap="12px">
            {!removeHeading && (
              <Text color="primary" weight="bold">
                Chcem odoberať novinky
              </Text>
            )}
            <Flex gap="12px" alignSelf="stretch" alignItems="flex-start">
              <TextField
                text={newsletterEmail}
                onTextChanged={onNewsletterChanged}
                label="Email"
                errorText={nesletterError}
                disabled={newsletterLoading}
                borderColor="primary"
                inputBackgroundColor="primary"
                disableMultiline
              />
              <Button
                iconBefore={<AiOutlineSend />}
                variant="accent"
                disabled={newsletterLoading}
                onClick={onSubmit}
              />
            </Flex>
            <Text size="small" color="primary" align="center">
              Poskytnutím emailu súhlasíš s jeho spracovaním v súlade s{' '}
              <a href={GDPR_URL} target="_blank">
                GDPR.
              </a>
            </Text>
          </Flex>
        </form>
      )}
      {newsletterUpdatedSuccess && (
        <Text color="primary" align="center">
          Poslali sme ti potvrdzovací email
        </Text>
      )}
      {newsletterUpdatedFailure && (
        <Text color="primary" align="center">
          Niečo sa nepodarilo, skús to prosím neskôr
        </Text>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 340px;

  @media ${device.S} {
    width: 300px;
  }

  @media ${device.XS} {
    width: 280px;
  }
`

export default NewsletterForm
