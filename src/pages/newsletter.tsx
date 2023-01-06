import {NextPage} from 'next'
import React, {ChangeEvent, useState} from 'react'
import NavBar from '../components/NavBar'
import PageContentWrapper from '../components/PageContentWrapper'
import {useAuth} from '../AuthUserContext'
import styled from 'styled-components'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import Text from '../components/core/Text'
import Button from '../components/core/Button'
import TextField from '../components/core/TextField'
import {emailRegex} from '../utils'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3'
import {addToNewsletter, authPost} from '../api'
import {AddToNewsletterRequest} from '../types'
import Head from '../components/Head'
import {prefixWithHost, routes} from '../routes'

const NewsletterPage: NextPage = () => {
  const {executeRecaptcha} = useGoogleReCaptcha()
  const {user} = useAuth()
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterEmailError, setNewsletterEmailError] = useState('')
  const [newsletterSubmittedSuccess, setNewsletterUpdatedSuccess] =
    useState<boolean>(false)
  const [newsletterSubmitedFailure, setNewsletterUpdatedFailure] =
    useState<boolean>(false)

  const onNewsletterChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value)
    setNewsletterEmailError('')
  }

  const onSubmit = async () => {
    if (!newsletterEmail.trimEnd()) {
      setNewsletterEmailError('Email je prázdny')
      return
    } else if (!emailRegex.test(newsletterEmail)) {
      setNewsletterEmailError('Email má nesprávny formát')
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
          subscribedFrom: 'NEWSLETTER_PAGE',
        })
      } else {
        result = await authPost<AddToNewsletterRequest>(addToNewsletter(), {
          email: newsletterEmail,
          subscribedFrom: 'NEWSLETTER_PAGE',
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
    <>
      <Head
        title="Newsletter | Street of Code"
        description="Prihlás sa na náš newsletter!"
        url={prefixWithHost(routes.newsletter)}
      />
      <NavBar />
      <PageContentWrapper>
        {!newsletterSubmittedSuccess && !newsletterSubmitedFailure && (
          <NewsletterFlexWrapper
            direction="column"
            gap="16px"
            alignItems="flex-start"
            alignSelf="center"
          >
            <Heading variant="h4" withAccentUnderline normalWeight>
              Odber noviniek
            </Heading>
            <TextField
              text={newsletterEmail}
              onTextChanged={onNewsletterChanged}
              label="Email"
              errorText={newsletterEmailError}
              disabled={newsletterLoading}
            />
            <Button
              disabled={newsletterLoading}
              variant="accent"
              onClick={onSubmit}
              style={{alignSelf: 'stretch'}}
            >
              Prihlásiť sa na odber noviniek
            </Button>
            <Text>
              Prihlás sa na odber našich noviniek a medzi prvými sa dozvieš o
              nových kurzoch, videách, podcastoch a všeličom ďalšom, čo
              podnikneme. Neboj sa, nebudeme ťa spamovať a občas ťa potešíme aj
              nejakou tou programátorskou radou.
            </Text>
          </NewsletterFlexWrapper>
        )}
        {newsletterSubmittedSuccess && (
          <Heading variant="h5" align="center">
            Poslali sme ti potvrdzovací email
          </Heading>
        )}
        {newsletterSubmitedFailure && (
          <Heading variant="h5" align="center">
            Niečo sa nepodarilo, skús to prosím neskôr
          </Heading>
        )}
      </PageContentWrapper>
    </>
  )
}

const NewsletterFlexWrapper = styled(Flex)`
  margin: 0 auto;
  max-width: 420px;
`

export default NewsletterPage
