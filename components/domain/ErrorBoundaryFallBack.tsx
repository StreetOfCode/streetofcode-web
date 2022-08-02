import React from 'react'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import NextLink from '../core/NextLink'

const ErrorBoundaryFallBack = () => {
  return (<Flex direction="column" justifyContent="center" gap="48px">
    <Heading variant="h2">Nastala neočakávaná chyba</Heading>
    <NextLink href="/">
      <Heading variant="h3" withAccentUnderline>Prejsť na hlavnú stránku</Heading>
    </NextLink>
  </Flex>)
}

export default ErrorBoundaryFallBack
