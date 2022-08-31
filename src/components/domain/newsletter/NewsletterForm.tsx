import React, {ChangeEvent, HTMLAttributes, useState} from 'react'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3'
import {AiOutlineSend} from 'react-icons/ai'
import {addToNewsletter, authPost} from '../../../api'
import {AddToNewsletterRequest, SocUser} from '../../../types'
import {emailRegex} from '../../../utils'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import TextField from '../../core/TextField'

type Props = {
  className?: string
  user?: SocUser
} & HTMLAttributes<HTMLElement>

const NewsletterForm = ({className, user, ...props}: Props) => {
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

  const onNewsletterChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value)
    setNewsletterError('')
  }

  const onSubmit = async () => {
    if (!newsletterEmail.trimEnd()) {
      setNewsletterError('Email je prádzny')
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
        })
      } else {
        result = await authPost<AddToNewsletterRequest>(addToNewsletter(), {
          email: newsletterEmail,
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
    <div className={className} {...props}>
      {!newsletterUpdatedSuccess && !newsletterUpdatedFailure && (
        <Flex direction="column" gap="12px">
          <Text color="primary">Chcem odoberať novinky</Text>
          <Flex gap="12px">
            <TextField
              text={newsletterEmail}
              onTextChanged={onNewsletterChanged}
              label="Email"
              errorText={nesletterError}
              disabled={newsletterLoading}
              borderColor="primary"
              inputBackgroundColor="primary"
            />
            <Button
              iconBefore={<AiOutlineSend />}
              variant="accent"
              disabled={newsletterLoading}
              onClick={onSubmit}
            />
          </Flex>
        </Flex>
      )}
      {newsletterUpdatedSuccess && (
        <Text color="primary">Poslali sme ti potvrdzovací email</Text>
      )}
      {newsletterUpdatedFailure && (
        <Text color="primary">Niečo sa nepodarilo, skús to prosím neskôr</Text>
      )}
    </div>
  )
}

export default NewsletterForm
