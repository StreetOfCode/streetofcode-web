import {Button, CircularProgress, FormControl, TextField, Typography} from '@material-ui/core'
import {NextPage} from 'next'
import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import * as Api from '../api'
import NavBar from '../components/NavBar'
import PageContentWrapper from '../components/PageContentWrapper'
import {SendFeedbackRequest} from '../types'
import {emailRegex} from '../utils'

const FEEDBACK_INFO_TEXT = `Chceš nám niečo povedať? Či už je to niečo pozitívne, negatívne,
niečo nefunguje či máš nejaký nápad ako by sme mohli stránku a obsah vylepšiť, tak všetko chceme vedieť`
const SUCCESSFULLY_SENT_EMAIL_TEXT = 'Email bol úspešne poslaný, ďakujeme pekne.'

// TODO rething this whole page and redesign

const FeedbackPage: NextPage = () => {
  const [emailSuccessfullySentText, setEmailSuccessfullySentText] = useState<boolean>(false)
  const [emailText, setEmailText] = useState<string>('')
  const [emailTextError, setEmailTextError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [subject, setSubject] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getFeedbackText = () => {
    if (emailSuccessfullySentText) {
      return SUCCESSFULLY_SENT_EMAIL_TEXT
    }
    return FEEDBACK_INFO_TEXT
  }

  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false)
    setEmail(e.target.value)
  }

  const onSubjectChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const onEmailTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailTextError(false)
    setEmailText(e.target.value)
  }

  const onAdd = async () => {
    setIsLoading(true)

    if (!emailText) {
      setEmailTextError(true)
      setIsLoading(false)
      return
    }

    if (!email) {
      setEmailError(true)
      setIsLoading(false)
      return
    } else if (!emailRegex.test(email)) {
      setEmailError(true)
      setIsLoading(false)
      return
    }

    setEmailError(false)
    setEmailTextError(false)

    const result = await Api.authPost<SendFeedbackRequest>(Api.sendFeedbackUrl(), {
      email,
      subject,
      emailText,
    })

    if (!result.ok) {
      // TODO handle error
      setIsLoading(false)
      return
    }

    setEmailSuccessfullySentText(true)
    setIsLoading(false)

    setEmailText('')
    setEmail('')
    setSubject('')
  }

  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <Wrapper>
          <Form>
            <Typography variant="h6" component="h6">
              {getFeedbackText()}
            </Typography>
            <TextField label="Email" required value={email} onChange={onEmailChanged} error={emailError} />
            <TextField label="Predmet" value={subject} onChange={onSubjectChanged} />
            <TextField
              label="Správa"
              required
              value={emailText}
              onChange={onEmailTextChanged}
              error={emailTextError}
              multiline
              rows={6}
            />
            {isLoading && <CircularProgress />}
            {!isLoading && (
              <Button variant="contained" color="primary" onClick={onAdd}>
                Odoslať
              </Button>
            )}
          </Form>
        </Wrapper>
      </PageContentWrapper>
    </>

  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled(FormControl)`
  width: 50%;
`

export default FeedbackPage
