import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview, ReceivePromoCodeRequest} from '../../../types'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'
import {courseProductsConfig, getCourseProductName} from '../../../constants'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import {device} from '../../../theme/device'
import {AiOutlineSend} from 'react-icons/ai'
import TextField from '../../core/TextField'
import {emailRegex} from '../../../utils'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3'
import {useAuth} from '../../../AuthUserContext'
import {authPost, javaCourseCouponUrl} from '../../../api'
import {javaCourseGoldLogo, javaCourseLogo} from '../../../images'
import Countdown from 'react-countdown'

type Props = {
  className?: string
  course: CourseOverview
  innerRef?: React.MutableRefObject<null | HTMLDivElement>
}

const GOLD_COLOR = '#F2BD4C'

const JavaKurzCourseProducts = ({className, course, innerRef}: Props) => {
  const {executeRecaptcha} = useGoogleReCaptcha()
  const {user, isLoading} = useAuth()
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [emailLoading, setEmailLoading] = React.useState(false)
  const [showEmailInput, setShowEmailInput] = React.useState(true)
  const [hasUserReceivedPromoCode, setHasUserReceivedPromoCode] =
    React.useState(false)

  const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)
  if (isCourseOwnedByUser) return <></>

  const buyableUntil =
    process.env.NEXT_PUBLIC_COURSE_PRODUCT_BUYABLE_UNTIL_JAVA_KURZ || ''
  const isBuyable = new Date(buyableUntil) > new Date()

  const courseProducts = course.courseProducts
  Utils.assert(courseProducts.length === 2, 'Expected 2 course products')

  const basic = courseProducts.reduce((prev, current) =>
    prev.price < current.price ? prev : current,
  )
  const premium = courseProducts.filter(
    (cp) => cp.productId !== basic.productId,
  )[0]

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const onEmailSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!email.trimEnd()) {
      setEmailError('Email je prázdny')
      return
    } else if (!emailRegex.test(email)) {
      setEmailError('Email má nesprávny formát')
      return
    }

    try {
      setEmailLoading(true)

      let result: Response | undefined

      if (!user && executeRecaptcha) {
        const token = await executeRecaptcha('javapromo')

        result = await authPost<ReceivePromoCodeRequest>(
          javaCourseCouponUrl(),
          {
            email,
            recaptchaToken: token,
          },
        )
      } else {
        result = await authPost<ReceivePromoCodeRequest>(
          javaCourseCouponUrl(),
          {
            email,
          },
        )
      }

      if (result.ok) {
        setShowEmailInput(false)
        setHasUserReceivedPromoCode(true)
      } else {
        setEmailError('Nepodarilo sa odoslať email')
      }
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <Flex
      direction="column"
      gap="48px"
      alignItems="center"
      className={className}
      innerRef={innerRef}
    >
      <Flex direction="column" gap="16px" alignItems="center">
        <Heading variant="h3" align="center" uppercase>
          predpredaj
        </Heading>
        {isBuyable && !isLoading && (
          <CountdownWrapper direction="column" gap="16px" alignItems="center">
            <StyledCountdown date={new Date(buyableUntil)} />
            <Flex gap="8px">
              <Text size="small">Dni</Text>
              <Text size="small">Hodiny</Text>
              <Text size="small">Minúty</Text>
              <Text size="small">Sekundy</Text>
            </Flex>
          </CountdownWrapper>
        )}
        {isBuyable && showEmailInput && (
          <Text align="center">
            Nemáš zľavový kód? Napíš svoj email a pošleme ti ho
          </Text>
        )}
        {isBuyable && showEmailInput && (
          <form>
            <Flex direction="row" gap="12px" alignItems="flex-start">
              <TextField
                text={email}
                onTextChanged={onEmailChanged}
                label="Email"
                errorText={emailError}
                disabled={!isBuyable || emailLoading}
                borderColor="secondary"
                inputBackgroundColor="primary"
                disableMultiline
              />
              <Button
                iconBefore={<AiOutlineSend />}
                variant="accent"
                disabled={!isBuyable || emailLoading}
                onClick={onEmailSubmit}
              />
            </Flex>
          </form>
        )}
        {isBuyable && !showEmailInput && hasUserReceivedPromoCode && (
          <Text align="center">
            Zľavový kód bol odoslaný na email. Ak ho nevidíš, skontroluj si
            spam.
          </Text>
        )}
        {!isBuyable && (
          <Text align="center">
            Predpredaj skončil. Kurz bude otvorený najskôr na začiatku roka
            2024. Pre viac info sa prihlás na náš newsletter
          </Text>
        )}
      </Flex>
      <CardsFlex justifyContent="center" gap="32px" alignItems="flex-start">
        <CardWrapper direction="column" gap="16px" alignItems="flex-start">
          <HeaderWrapper direction="column" gap="16px">
            <Heading variant="h4" uppercase>
              {getCourseProductName(basic.productId)}
            </Heading>
            <Heading variant="h3">
              {basic.price != null ? `${basic.price / 100} €` : 'N/A'}
            </Heading>
            <NextLink
              href={{
                pathname: routes.checkout.courseProduct(
                  course.slug,
                  basic.productId,
                ),
              }}
            >
              <CheckoutButton
                variant="accent"
                disabled={basic.price == null || !isBuyable}
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
              <Text>Prístup ku všetkým videám</Text>
            </li>
            <li>
              <Text>Všetky úlohy a zadania</Text>
            </li>
            <li>
              <Text>Prístup k súkromnej Discord komunite</Text>
            </li>
          </BenefitsSection>
          <ModulesWrapperFlex
            direction="column"
            gap="12px"
            alignItems="flex-start"
          >
            <Text weight="bold">Moduly:</Text>
            <ModulesSection>
              <li>
                <Text>Základy v Jave</Text>
              </li>
              <li>
                <Text>Výnimky</Text>
              </li>
              <li>
                <Text>Dátové štruktúry</Text>
              </li>
              <li>
                <Text>Práca so súbormi</Text>
              </li>
              <li>
                <Text>OOP</Text>
              </li>
              <li>
                <Text>Git a GitHub</Text>
              </li>
              <ComingSoon>
                <Text>Stream API</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>SQL Databázy</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>Spring Boot</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>Príprava na pohovor</Text>
              </ComingSoon>
            </ModulesSection>
          </ModulesWrapperFlex>
          <BottomText>
            Staň sa Junior Java programátorom/kou! V kurze sa naučíš všetko
            potrebné a dostaneš podporu našej Discord komunity. Nekupuj 4 rôzne
            kurzy od rôznych inštruktorov, stačí ti tento jeden.
          </BottomText>
        </CardWrapper>

        <CardWrapper direction="column" gap="16px" alignItems="flex-start" gold>
          <HeaderWrapper direction="column" gap="24px" gold>
            <GoldHeading variant="h4" uppercase>
              {getCourseProductName(premium.productId)}
            </GoldHeading>
            <Heading variant="h3">
              {premium.price != null ? `${premium.price / 100} €` : 'N/A'}
            </Heading>
            <NextLink
              href={{
                pathname: routes.checkout.courseProduct(
                  course.slug,
                  premium.productId,
                ),
              }}
            >
              <CheckoutButton
                variant="accent"
                disabled={premium.price == null || !isBuyable}
                uppercase
                gold
              >
                Kúpiť
              </CheckoutButton>
            </NextLink>
            <JavaCourseImageWrapper gold>
              <Image
                alt="Java kurz"
                src={javaCourseGoldLogo}
                layout="fill"
                priority
              />
            </JavaCourseImageWrapper>
          </HeaderWrapper>
          <BenefitsSection gold>
            <li>
              <Text>Prístup ku všetkým videám</Text>
            </li>
            <li>
              <Text>Všetky úlohy a zadania</Text>
            </li>
            <li>
              <Text>Prístup k súkromnej Discord komunite</Text>
            </li>
          </BenefitsSection>
          <ModulesWrapperFlex
            direction="column"
            gap="12px"
            alignItems="flex-start"
            gold
          >
            <Text weight="bold">Moduly:</Text>
            <ModulesSection>
              <li>
                <Text>Základy v Jave</Text>
              </li>
              <li>
                <Text>Výnimky</Text>
              </li>
              <li>
                <Text>Dátové štruktúry</Text>
              </li>
              <li>
                <Text>Práca so súbormi</Text>
              </li>
              <li>
                <Text>OOP</Text>
              </li>
              <li>
                <Text>Git a GitHub</Text>
              </li>
              <ComingSoon>
                <Text>Stream API</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>SQL Databázy</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>Spring Boot</Text>
              </ComingSoon>
              <ComingSoon>
                <Text>Príprava na pohovor</Text>
              </ComingSoon>
            </ModulesSection>
          </ModulesWrapperFlex>
          <PlusWrapperFlex
            direction="column"
            gap="12px"
            alignItems="flex-start"
            gold
          >
            <Text weight="bold">Plus:</Text>
            <PlusBenefitsSection>
              <li>
                <Text>Individuálny prístup</Text>
              </li>
              <li>
                <Text>Ohodnotené zadania</Text>
              </li>
              <li>
                <Text>2 hodiny konzultácií</Text>
              </li>
              <li>
                <Text>Pomoc s tvorbou životopisu</Text>
              </li>
              <li>
                <Text>Kariérne poradenstvo</Text>
              </li>
            </PlusBenefitsSection>
          </PlusWrapperFlex>
          <BottomText>
            Zvýš svoje šance na úspech! Vďaka individuálnemu prístupu budeš v
            kurze napredovať rýchlejšie. S mentorom z praxe sa zameriaš aj na
            to, ako sa úspešne dostať na trh práce.
          </BottomText>
        </CardWrapper>
      </CardsFlex>
      {!isBuyable && (
        <Heading variant="h5" align="center">
          Predpredaj skončil. Kurz bude opäť dostupný od 1.1.2024.
        </Heading>
      )}
    </Flex>
  )
}

const CourseProducts = ({className, course, innerRef}: Props) => {
  if (course.slug === courseProductsConfig.javaKurz.slug) {
    return (
      <JavaKurzCourseProducts
        course={course}
        innerRef={innerRef}
        className={className}
      />
    )
  } else {
    return <></>
  }
}

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
  border: ${(props) =>
    `6px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};
  width: 400px;

  @media ${device.S} {
    width: 360px;
  }

  @media ${device.XS} {
    width: 100%;
  }
`

const CountdownWrapper = styled(Flex)`
  margin-bottom: 12px;
  width: 300px;
  opacity: 0.7;

  span {
    color: var(--color-accent);
  }
`

const StyledCountdown = styled(Countdown)`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.13em;
`

const HeaderWrapper = styled(Flex)<{gold?: boolean}>`
  align-self: stretch;
  padding-top: 64px;
  padding-bottom: 24px;
  border-radius: 18px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: ${(props) =>
    `4px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};
  position: relative;
`

const JavaCourseImageWrapper = styled.div<{gold?: boolean}>`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 10px;
  border: ${(props) =>
    `4px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};
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
  border-bottom: ${(props) =>
    `2px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};

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

const PlusBenefitsSection = styled.ul`
  list-style: none;
  align-self: stretch;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    :before {
      content: '+';
    }

    :not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
`

const PlusWrapperFlex = styled(Flex)<{gold?: boolean}>`
  align-self: stretch;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 12px;
  border-bottom: ${(props) =>
    `2px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};
`

const ModulesWrapperFlex = styled(Flex)<{gold?: boolean}>`
  align-self: stretch;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 12px;
  border-bottom: ${(props) =>
    `2px solid ${props.gold ? GOLD_COLOR : 'var(--color-accent)'}`};
`

const ModulesSection = styled.ol`
  list-style: none;
  align-self: stretch;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    counter-increment: counter;

    :before {
      aspect-ratio: 1;
      width: 28px;
      display: grid;
      place-items: center;
      border: 1px solid var(--color-secondary);
      box-shadow: 0.1em 0.1em 0 var(--color-secondary);
      border-radius: 50%;
      font-weight: bold;
      content: counter(counter);
    }

    :not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
`

const ComingSoon = styled.li`
  opacity: 0.5;

  :after {
    content: 'čoskoro';
    text-transform: uppercase;
    padding: 4px 12px;
    font-weight: bold;
    font-size: 12px;
    display: inline-block;
    border-radius: 22px;
    border: 1px solid var(--color-secondary);
  }
`

const CheckoutButton = styled(Button)<{gold?: boolean}>`
  width: 260px;
  background-color: ${(props) =>
    props.gold ? GOLD_COLOR : 'var(--color-accent)'};
  border-color: ${(props) => (props.gold ? GOLD_COLOR : 'var(--color-accent)')};

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

const GoldHeading = styled(Heading)`
  color: ${GOLD_COLOR};
`

export default CourseProducts
