import React, {useEffect, useState} from 'react'
import {useAuth} from '../AuthUserContext'
import Flex from './core/Flex'
import Text from './core/Text'
import Heading from './core/Heading'
import Modal from './core/Modal'
import NewsletterForm from './domain/newsletter/NewsletterForm'
import {useRouter} from 'next/router'
import {storage} from '../localStorage'
import styled from 'styled-components'

const SHOW_AFTER_MILLIS =
  process.env.NEXT_PUBLIC_SHOW_NEWSLETTER_POPUP_AFTER_MILLIS

const NewsletterModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const {user, isLoading} = useAuth()
  const router = useRouter()

  useEffect(() => {
    const maybeOpenModal = () => {
      if (
        router.asPath !== '/' &&
        !user &&
        !storage.hasUserSeenNewsletterModal()
      ) {
        setModalOpen(true)
        storage.setHasUserSeenNewsletterModal()
      }
    }

    if (isLoading) return

    const timeout = setTimeout(
      () => maybeOpenModal(),
      Number(SHOW_AFTER_MILLIS),
    )

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout)
  }, [isLoading])

  return (
    <>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Flex direction="column" gap="16px">
            <Heading
              color="primary"
              variant="h5"
              align="center"
              withAccentUnderline
            >
              Chceš sa dozvedieť o našom novom obsahu?
            </Heading>
            <Text color="primary" align="center">
              Prihlás sa na odber našich noviniek a medzi prvými sa dozvieš o{' '}
              <b>nových kurzoch, videách, podcastoch</b> a všeličom ďalšom, čo
              podnikneme. Neboj sa, nebudeme ťa spamovať a občas ta potešíme aj
              nejakou tou programátorskou radou.
            </Text>
            <StyledNewsletterFrom from="NEWSLETTER_MODAL" removeHeading />
            <Text color="primary" size="small" align="center">
              Sme <b>Street of Code</b> a tvoríme kurzy, podcast, videá a články
              najmä pre začínajúcich programátorov alebo programátorky.
            </Text>
          </Flex>
        </Modal>
      )}
    </>
  )
}

const StyledNewsletterFrom = styled(NewsletterForm)`
  width: 100%;
  max-width: 400px;
`

export default NewsletterModal
