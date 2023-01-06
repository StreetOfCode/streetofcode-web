import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../components/PageContentWrapper'
import Flex from '../components/core/Flex'
import NavBar from '../components/NavBar'
import Heading from '../components/core/Heading'
import NextLink from '../components/core/NextLink'
import {routes} from '../routes'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <Flex direction="column" justifyContent="center" gap="48px">
          <Heading variant="h3">Stránka nebola nájdená</Heading>
          <NextLink href={routes.root}>
            <Heading variant="h4" withAccentUnderline>
              Prejsť na hlavnú stránku
            </Heading>
          </NextLink>
        </Flex>
      </PageContentWrapper>
    </>
  )
}

export default NotFoundPage
