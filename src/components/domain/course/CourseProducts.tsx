import React from 'react'
import Image from 'next/image'
import styled, {keyframes} from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview} from '../../../types'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'
import {courseProductsConfig} from '../../../constants'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import {device} from '../../../theme/device'
import {javaCourseLogo, sqlLogoImage, webGamesLogo} from '../../../images'
import {BiChevronDown} from 'react-icons/bi'
import * as Accordion from '@radix-ui/react-accordion'

type Props = {
  className?: string
  course: CourseOverview
  innerRef?: React.MutableRefObject<null | HTMLDivElement>
}

const JavaKurzCourseProduct = ({className, course, innerRef}: Props) => {
  const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)
  if (isCourseOwnedByUser) return <></>

  const activeCourseProducts = course.courseProducts.filter((c) => !c.archived)
  Utils.assert(
    activeCourseProducts.length === 1,
    'Expected 1 active course product',
  )

  const javaProduct = activeCourseProducts[0]

  let counter = 0

  return (
    <Flex
      direction="column"
      gap="48px"
      alignItems="center"
      className={className}
      innerRef={innerRef}
    >
      <CardsFlex justifyContent="center" gap="32px" alignItems="flex-start">
        <CardWrapper direction="column" gap="16px" alignItems="flex-start">
          <HeaderWrapper direction="column" gap="16px">
            <Heading variant="h5" align={'center'}>
              Chcem sa stať Java programátorom/kou
            </Heading>
            <Heading variant="h4">
              {javaProduct.price != null
                ? `${javaProduct.price / 100} €`
                : 'N/A'}
            </Heading>
            <NextLink
              href={{
                pathname: routes.checkout.courseProduct(
                  course.slug,
                  javaProduct.productId,
                ),
              }}
            >
              <CheckoutButton
                variant="accent"
                disabled={javaProduct.price == null}
                uppercase
              >
                Kúpiť
              </CheckoutButton>
            </NextLink>
            <JavaCourseImageWrapper>
              <Image
                alt="Java kurz"
                src={javaCourseLogo}
                layout="fill"
                priority
              />
            </JavaCourseImageWrapper>
          </HeaderWrapper>
          <BenefitsSection>
            <li>
              <Text>Prístup ku všetkým videám navždy</Text>
            </li>
            <li>
              <Text>Všetky úlohy a zadania</Text>
            </li>
            <li>
              <Text>Všetky zadania ohodnotené lektorom</Text>
            </li>
            <li>
              <Text>Prístup k súkromnej Discord komunite</Text>
            </li>
            <li>
              <Text>Kariérne poradenstvo</Text>
            </li>
          </BenefitsSection>
          <BottomText>
            Staň sa Junior Java programátorom/kou! V kurze sa naučíš všetko
            potrebné a dostaneš podporu našej Discord komunity. Nekupuj 4 rôzne
            kurzy od rôznych inštruktorov, stačí ti tento jeden.
          </BottomText>
        </CardWrapper>
      </CardsFlex>

      <Heading variant="h4">Časté otázky</Heading>
      <AccordionRoot type="multiple">
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Pre koho je kurz určený?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Tento kurz nie je pre úplných začiatočníkov. Javu síce nemusíš
                poznať vôbec, ale mať za sebou už aspoň trošku programovania
                áno. Ak máš záujem skôr o kurz, ktorý ťa uvedie do sveta
                programovania, tak na to máme zadarmo kurz{' '}
                <a href={'/kurzy/informatika-101'} target="_blank">
                  Informatika 101
                </a>
                . Zároveň tento Java kurz je pre všetkých serióznych záujemcov
                stať sa Java programátorom či programátorkou.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Čo všetko získam?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Po zakúpení kurzu získaš prístup ku všetkým videám, úlohám,
                zadaniam, materiálom či súkromnej Discord komunite. Študenti
                tohto kurzu si najviac cenia hodnotenie zadaní.
                <br />
                Kurz sa skladá z dopredu nahratých videí a úloh. Každý študent
                si ide vlastným tempom a pozerá videá kedy chce, v akom poradí
                chce.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <CourseValidationQuestion counter={counter++} />
        <PaymentMethodsQuestion counter={counter++} />
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">
                Čo ak mám záujem o osobné konzultácie?
              </Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Po zakúpení kurzu získaš prístup ku súkromnej Discord komunite,
                kde môžeš klásť otázky. Navyše s každým študentom sa snažím mať
                osobný kontakt (na Discorde) a pomôcť mu s jeho problémami.{' '}
                <br /> <br />
                Ak máš záujem o osobné konzultácie, napíš mi na
                jakub@streetofcode.sk (alebo na Discorde) a dohodneme sa. Cez
                osobné konzulácie formou videohovoru vieme spolu napríklad
                riešiť nasledovné témy:
                <ul>
                  <li>
                    Príprava na pohovor (vieme si dať aj simulovaný pohovor)
                  </li>
                  <li>Code review</li>
                  <li>Technické a iné otázky</li>
                  <li>Tvorba životopisu a kariérne poradenstvo</li>
                </ul>
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Dostanem certifikát?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Veľmi rád by som napísal, že bude pekný farebný certifikát, no
                pravda je taká, že certifikáty z programovania skoro nikoho
                nezaujímajú. Na pohovore sa ťa budú pýtať technické otázky a
                pozerať na tvoje projekty na GitHube, a nie na to, či máš
                certifikát o absolvovaní kurzu. Na veciach, na ktorých záleží,
                ťa v tomto kurze pripravím.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
      </AccordionRoot>
    </Flex>
  )
}

const SQLCourseProduct = ({className, course, innerRef}: Props) => {
  const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)
  if (isCourseOwnedByUser) return <></>

  const activeCourseProducts = course.courseProducts.filter((c) => !c.archived)
  Utils.assert(
    activeCourseProducts.length === 1,
    'Expected 1 active course product',
  )

  const sqlProduct = activeCourseProducts[0]

  let counter = 0

  return (
    <Flex
      direction="column"
      gap="48px"
      alignItems="center"
      className={className}
      innerRef={innerRef}
    >
      <CardsFlex justifyContent="center" gap="32px" alignItems="flex-start">
        <CardWrapper direction="column" gap="16px" alignItems="flex-start">
          <HeaderWrapper direction="column" gap="16px">
            <Heading variant="h5" align={'center'}>
              Chcem sa naučiť základy SQL
            </Heading>
            <Heading variant="h4">
              {sqlProduct.price != null ? `${sqlProduct.price / 100} €` : 'N/A'}
            </Heading>
            <NextLink
              href={{
                pathname: routes.checkout.courseProduct(
                  course.slug,
                  sqlProduct.productId,
                ),
              }}
            >
              <CheckoutButton
                variant="accent"
                disabled={sqlProduct.price == null}
                uppercase
              >
                Kúpiť
              </CheckoutButton>
            </NextLink>
            <JavaCourseImageWrapper>
              <Image
                alt="SQL Základy kurz"
                src={sqlLogoImage}
                layout="fill"
                priority
              />
            </JavaCourseImageWrapper>
          </HeaderWrapper>
          <BottomText>
            Ovládni základy SQL. Nauč sa prehľadávať a vytvárať dáta, ako aj
            navrhovať vlastné databázy.
          </BottomText>
        </CardWrapper>
      </CardsFlex>

      <Heading variant="h4">Časté otázky</Heading>
      <AccordionRoot type="multiple">
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Pre koho je kurz určený?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Kurz je určený pre všetkých, ktorí sa chcú naučiť základy SQL.
                Nie je potrebná žiadna predchádzajúca znalosť databáz. Či už si
                začínajúci programátor, analytik, alebo manažér, tento kurz ti
                pomôže zlepšiť tvoje schopnosti práce s dátami.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Čo všetko získam?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Po zakúpení kurzu získaš prístup ku všetkým videám, úlohám a
                materiálom. Každý študent si ide vlastným tempom a pozerá videá
                kedy chce, v akom poradí chce.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <CourseValidationQuestion counter={counter++} />
        <PaymentMethodsQuestion counter={counter++} />
      </AccordionRoot>
    </Flex>
  )
}

const WebGamesCourseProduct = ({className, course, innerRef}: Props) => {
  const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)
  if (isCourseOwnedByUser) return <></>

  const activeCourseProducts = course.courseProducts.filter((c) => !c.archived)
  Utils.assert(
    activeCourseProducts.length === 1,
    'Expected 1 active course product',
  )

  const webGamesProduct = activeCourseProducts[0]

  let counter = 0

  return (
    <Flex
      direction="column"
      gap="48px"
      alignItems="center"
      className={className}
      innerRef={innerRef}
    >
      <CardsFlex justifyContent="center" gap="32px" alignItems="flex-start">
        <CardWrapper direction="column" gap="16px" alignItems="flex-start">
          <HeaderWrapper direction="column" gap="16px">
            <Heading variant="h5" align={'center'}>
              Chcem sa naučiť kódiť webové hry
            </Heading>
            <Heading variant="h4">
              {webGamesProduct.price != null
                ? `${webGamesProduct.price / 100} €`
                : 'N/A'}
            </Heading>
            <NextLink
              href={{
                pathname: routes.checkout.courseProduct(
                  course.slug,
                  webGamesProduct.productId,
                ),
              }}
            >
              <CheckoutButton
                variant="accent"
                disabled={webGamesProduct.price == null}
                uppercase
              >
                Kúpiť
              </CheckoutButton>
            </NextLink>
            <JavaCourseImageWrapper>
              <Image
                alt="Webové hry kurz"
                src={webGamesLogo}
                layout="fill"
                priority
              />
            </JavaCourseImageWrapper>
          </HeaderWrapper>
          <BottomText>
            Vytvor si 3 klasické hry a pridaj si ich do svojho portfólia.
          </BottomText>
        </CardWrapper>
      </CardsFlex>

      <Heading variant="h4">Časté otázky</Heading>
      <AccordionRoot type="multiple">
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Pre koho je kurz určený?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Tento kurz je ideálny pre začiatočníkov, ktorí už poznajú
                základy HTML, CSS a JavaScriptu a chcú si vytvoriť prvé
                interaktívne projekty. Je to perfektná príležitosť ako si
                precvičiť svoje znalosti na reálnych hrách, ktoré môžete pridať
                do svojho portfólia.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <Item value={`${counter++}`}>
          <Header>
            <Trigger>
              <Heading variant="h6">Čo všetko získam?</Heading>
              <AccordionChevron />
            </Trigger>
          </Header>
          <AccordionContent>
            <AccordionContentWrapper clickable>
              <Text>
                Po zakúpení kurzu získaš prístup ku všetkým videám a materiálom.
                Každý študent si ide vlastným tempom a pozerá videá kedy chce, v
                akom poradí chce.
              </Text>
            </AccordionContentWrapper>
          </AccordionContent>
        </Item>
        <CourseValidationQuestion counter={counter++} />
        <PaymentMethodsQuestion counter={counter++} />
      </AccordionRoot>
    </Flex>
  )
}

const CourseValidationQuestion = ({counter}: {counter: number}) => {
  return (
    <Item value={`${counter++}`}>
      <Header>
        <Trigger>
          <Heading variant="h6">Ako dlho budem mať prístup ku kurzu?</Heading>
          <AccordionChevron />
        </Trigger>
      </Header>
      <AccordionContent>
        <AccordionContentWrapper clickable>
          <Text>
            Po zakúpení kurzu budeš mať prístup ku všetkým materiálom navždy.
          </Text>
        </AccordionContentWrapper>
      </AccordionContent>
    </Item>
  )
}

const PaymentMethodsQuestion = ({counter}: {counter: number}) => {
  return (
    <Item value={`${counter++}`}>
      <Header>
        <Trigger>
          <Heading variant="h6">Ako môžem platiť?</Heading>
          <AccordionChevron />
        </Trigger>
      </Header>
      <AccordionContent>
        <AccordionContentWrapper clickable>
          <Text>
            Platbu môžeš vykonať platobnou kartou. Po platbe získaš prístup ku
            kurzu ihneď. Kurz bude spárovaný s tvojím účtom na stránke. <br />
            Ak máš záujem o inú formu platby, alebo platbu na faktúru, kontaktuj
            nás na info@streetofcode.sk
          </Text>
        </AccordionContentWrapper>
      </AccordionContent>
    </Item>
  )
}

const CourseProducts = ({className, course, innerRef}: Props) => {
  if (course.slug === courseProductsConfig.javaKurz.slug) {
    return (
      <JavaKurzCourseProduct
        course={course}
        innerRef={innerRef}
        className={className}
      />
    )
  } else if (course.slug === courseProductsConfig.sql.slug) {
    return (
      <SQLCourseProduct
        course={course}
        innerRef={innerRef}
        className={className}
      />
    )
  } else if (course.slug === courseProductsConfig.webGames.slug) {
    return (
      <WebGamesCourseProduct
        course={course}
        innerRef={innerRef}
        className={className}
      />
    )
  } else {
    return <></>
  }
}

const AccordionRoot = styled(Accordion.Root)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 75%;

  @media ${device.S} {
    width: 100%;
  }
`
const Item = styled(Accordion.Item)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Header = styled(Accordion.Header)`
  margin: 0;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--color-accent);

  &:hover {
    cursor: pointer;
  }
`

const Trigger = styled(Accordion.Trigger)`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const openContentAnimation = keyframes({
  from: {height: 0},
  to: {height: 'var(--radix-accordion-content-height)'},
})

const closeContentAnimation = keyframes({
  from: {height: 'var(--radix-accordion-content-height)'},
  to: {height: 0},
})

const AccordionContent = styled(Accordion.Content)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  [data-state='open'] & {
    animation: ${openContentAnimation} 300ms ease-out forwards;
    overflow: hidden;
  }
  [data-state='closed'] & {
    animation: ${closeContentAnimation} 300ms ease-out forwards;
    overflow: hidden;
  }
`

const StyledText = styled(Text)``

const AccordionContentWrapper = styled(Flex)<{clickable: boolean}>`
  padding: 0 4px;

  &:hover {
    cursor: ${(props) => props.clickable && 'pointer'};
    color: ${(props) => props.clickable && 'var(--color-accent)'};

    ${StyledText} {
      color: ${(props) => props.clickable && 'var(--color-accent)'};
    }
  }

  svg {
    color: var(--color-secondary);
  }
`

const AccordionChevron = styled(BiChevronDown)`
  width: 24px;
  height: 24px;
  transition: transform 300ms;
  [data-state='open'] & {
    transform: rotate(180deg);
  }

  &:hover {
    cursor: pointer;
  }

  flex-shrink: 0;
  color: var(--color-secondary);
`

const CardsFlex = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
    gap: 36px;
  }
`

const CardWrapper = styled(Flex)<{gold?: boolean}>`
  margin-top: 48px;
  padding: 16px 16px 24px 16px;
  border-radius: 22px;
  border: 6px solid var(--color-accent);
  width: 500px;

  @media ${device.S} {
    width: 360px;
  }

  @media ${device.XS} {
    width: 100%;
  }
`

const HeaderWrapper = styled(Flex)<{gold?: boolean}>`
  align-self: stretch;
  padding-top: 64px;
  padding-bottom: 24px;
  border-radius: 18px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 4px solid var(--color-accent);
  position: relative;
`

const JavaCourseImageWrapper = styled.div<{gold?: boolean}>`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 10px;
  border: 4px solid var(--color-accent);
  background-color: var(--color-primary);

  position: absolute;
  bottom: 85%;
  left: 50%;
  transform: translateX(-50%);

  span {
    margin: 12px !important;
  }

  @media ${device.S} {
    width: 80px;
  }
`

const BenefitsSection = styled.ul<{gold?: boolean}>`
  list-style: none;
  align-self: stretch;
  margin: 0;
  padding-top: 0;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-accent);

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    :before {
      content: '✓';
    }

    :not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
`

const CheckoutButton = styled(Button)<{gold?: boolean}>`
  width: 260px;
  background-color: var(--color-accent);
  border-color: var(--color-accent);

  @media ${device.S} {
    width: 220px;
  }

  @media ${device.XS} {
    width: 200px;
  }
`

const BottomText = styled(Text)`
  padding-right: 8px;
  padding-left: 8px;
`

export default CourseProducts
