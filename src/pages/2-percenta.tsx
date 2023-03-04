import {NextPage} from 'next'
import React from 'react'
import NavBar from '../components/NavBar'
import PageContentWrapper from '../components/PageContentWrapper'
import Head from '../components/Head'
import {prefixWithHost, routes} from '../routes'
import Flex from '../components/core/Flex'
import Text from '../components/core/Text'
import Heading from '../components/core/Heading'
import styled from 'styled-components'

const TwoPercentPage: NextPage = () => {
  return (
    <>
      <Head
        title="2% dane"
        description="Daruj nám 2% z dane"
        url={prefixWithHost(routes.dvePercenta)}
      />
      <NavBar />
      <StyledPagedContentWrapper>
        <Flex direction="column" alignItems="center" gap="32px">
          <Heading variant="h4" align="center">
            Ďakujeme, že chceš darovať príspevok z tvojich daní nášmu
            občianskému združeniu!
          </Heading>
          <Heading variant="h6">Naše údaje</Heading>
          <Flex direction="column" alignItems="flex-start" gap="12px">
            <Flex direction="row" justifyContent="center" gap="8px">
              <Text>Obchodné meno:</Text>
              <Text weight="bold">Street of Code</Text>
            </Flex>
            <Flex direction="row" justifyContent="center" gap="8px">
              <Text>Právna forma:</Text>
              <Text weight="bold">Občianske združenie</Text>
            </Flex>
            <Flex direction="row" justifyContent="center" gap="8px">
              <Text>Sídlo:</Text>
              <Text weight="bold">Hlaváčiková 3163/29, 84105 Bratislava</Text>
            </Flex>
            <Flex direction="row" justifyContent="center" gap="8px">
              <Text>IČO:</Text>
              <Text weight="bold">53979028</Text>
            </Flex>
          </Flex>
          <Text align="center">
            Tvoj príspevok použijeme najmä na pokrytie našich nákladov. Medzi
            náklady rátame hosting tejto webstránky, hosting videí (Vimeo), a
            taktiež licenciu za Adobe softvéry.
          </Text>
          <a
            href="https://www.slovensko.sk/sk/zivotne-situacie/zivotna-situacia/_ako-poukazat-2-z-dani/"
            target="blank"
          >
            Ako preukázať 2% z daní?
          </a>
        </Flex>
      </StyledPagedContentWrapper>
    </>
  )
}

const StyledPagedContentWrapper = styled(PageContentWrapper)`
  max-width: 750px;
`

export default TwoPercentPage
