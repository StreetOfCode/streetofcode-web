import {NextPage} from 'next'
import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import * as Api from '../api'
import Button from '../components/core/Button'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import Text from '../components/core/Text'
import TextField from '../components/core/TextField'
import {discordInviteUrl} from '../components/landing-page/discord'
import NavBar from '../components/NavBar'
import PageContentWrapper from '../components/PageContentWrapper'
import {SendFeedbackRequest} from '../types'
import {emailRegex} from '../utils'


const SUCCESSFULLY_SENT_EMAIL_TEXT = 'Email bol úspešne poslaný, ďakujeme pekne.'
const FAILED_SENT_EMAIL_TEXT = 'Email sa nepodarilo odoslať'


const FeedbackPage: NextPage = () => {
  const [emailSentSuccess, setEmailSentSuccess] = useState<boolean>(false)
  const [emailSentError, setEmailSentError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageError, setMessageError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const onSubjectChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const onMessageChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    setMessageError('')
  }

  const onSubmit = async () => {
    if (!email.trimEnd()) {
      setEmailError('Email je prádzny')
      return
    } else if (!emailRegex.test(email)) {
      setEmailError('Email má nesprávny formát')
      return
    }

    if (!message.trimEnd()) {
      setMessageError('Správa je prázdna')
      return
    }

    try {
      setIsLoading(true)
      const result = await Api.authPost<SendFeedbackRequest>(Api.sendFeedbackUrl(), {
        email,
        subject,
        emailText: message,
      })

      if (!result.ok) {
        setEmailSentError(true)
      } else {
        setEmailSentSuccess(true)
      }
    } catch (err) {
      setEmailSentError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const renderDiscordLink = (text: string) => {
    return <a href={discordInviteUrl} target="blank">{text}</a>
  }

  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex direction="column" gap="32px" alignItems="flex-start">
            <FAQItem direction="column" gap="8px" alignItems="flex-start">
              <Heading variant="h3">
                Kde vám môžem napísať?
              </Heading>
              <Text>
                Najviac by sme preferovali, kebyže nám napíšeš na {renderDiscordLink('Discorde')}.
                Avšak môžeš nám napísať priamo mail na <strong>info@streetofcode.sk</strong>,
                na Instagrame či FB alebo použi formulár na tejto stránke.
              </Text>
            </FAQItem>
            <FAQItem direction="column" gap="8px" alignItems="flex-start">
              <Heading variant="h3">
                Ako môžem nahlásiť problém?
              </Heading>
              <Text>
                Ak si našiel alebo našla nejakú chybu, či už vizuálneho alebo funkčného charakteru,
                najlepšie bude, ak nám napíšes podrobnosti do mailu alebo na {renderDiscordLink('Discorde')}.
              </Text>
              <Text>Do správy prosím napíš:</Text>
              <StyledUL>
                <li>Zariadenie, na ktorom sa chyba prejavila (mobil, tablet, počítač)</li>
                <li>Popis chyby</li>
                <li>Pribal prosím ťa aj screenshoty, ak máš</li>
              </StyledUL>
            </FAQItem>
            <FAQItem direction="column" gap="8px" alignItems="flex-start">
              <Heading variant="h3">
                Chýba vám kurz, ktorý potrebujem
              </Heading>
              <Text>
                Ak si myslíš, že by tu určite nemal chýbať nejaký kurz, tak nám daj vedieť aký
                a možno ho pripravíme.
              </Text>
            </FAQItem>
            <FAQItem direction="column" gap="8px" alignItems="flex-start">
              <Heading variant="h3">
                Chcem s vami spolupracovať
              </Heading>
              <Text>
                Radi si tvoj nápad na spoluprácu vypočujeme. Napíš nám o čo ide a určite sa ti ozveme.
              </Text>
            </FAQItem>
          </Flex>
          <FormWrapper>
            <Flex direction="column" alignItems="flex-start" gap="20px">
              <Heading normalWeight variant="h4" align="left" withAccentUnderline>Tvoj email</Heading>
              <TextField
                text={email}
                onTextChanged={onEmailChanged}
                label="jozko.mrkvicka@gmail.com"
                errorText={emailError}
                disabled={isLoading || emailSentSuccess || emailSentError}
              />
              <Heading normalWeight variant="h4" align="left" withAccentUnderline>Predmet správy</Heading>
              <TextField
                text={subject}
                onTextChanged={onSubjectChanged}
                label="Chcem nahlásiť problém / Mám nápad"
                maxLength={128}
                disabled={isLoading || emailSentSuccess || emailSentError}
              />
              <Heading normalWeight variant="h4" align="left" withAccentUnderline>Správa</Heading>
              <TextField
                text={message}
                onTextChanged={onMessageChanged}
                errorText={messageError}
                maxLength={1024}
                disabled={isLoading || emailSentSuccess || emailSentError}
              />
              <Button
                variant="accent"
                disabled={isLoading || emailSentSuccess || emailSentError}
                onClick={onSubmit}
              >Odoslať správu
              </Button>
              {emailSentSuccess && <Text>{SUCCESSFULLY_SENT_EMAIL_TEXT}</Text>}
              {emailSentError && <Text>{FAILED_SENT_EMAIL_TEXT}</Text>}
            </Flex>
          </FormWrapper>
        </Flex>
      </PageContentWrapper>
    </>
  )
}

const FAQItem = styled(Flex)`
  width: 600px;
`

const StyledUL = styled.ul`
  margin: 0;
  margin-left: 16px;
  padding: 0;

  li {
    margin: 6px;
    padding: 0;
  }
`

const FormWrapper = styled.div`
  width: 400px;
`


export default FeedbackPage
