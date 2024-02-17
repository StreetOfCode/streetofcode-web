import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {CourseOverview} from '../../../types'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import NextLink from '../../core/NextLink'
import * as Utils from '../../../utils'
import {courseProductsConfig, getCourseProductName} from '../../../constants'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import {device} from '../../../theme/device'
import {javaCourseGoldLogo, javaCourseLogo} from '../../../images'

type Props = {
  className?: string
  course: CourseOverview
  innerRef?: React.MutableRefObject<null | HTMLDivElement>
}

const GOLD_COLOR = '#F2BD4C'

const JavaKurzCourseProducts = ({className, course, innerRef}: Props) => {
  const isCourseOwnedByUser = Utils.isCourseOwnedByUser(course)
  if (isCourseOwnedByUser) return <></>

  const courseProducts = course.courseProducts
  Utils.assert(courseProducts.length === 2, 'Expected 2 course products')

  const basic = courseProducts.reduce((prev, current) =>
    prev.price < current.price ? prev : current,
  )
  const premium = courseProducts.filter(
    (cp) => cp.productId !== basic.productId,
  )[0]

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
                disabled={basic.price == null}
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
              <Text>Prístup k súkromnej Discord komunite</Text>
            </li>
            <li>
              <Text>Ohodnotené zadania</Text>
            </li>
          </BenefitsSection>
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
                disabled={premium.price == null}
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
              <Text>Všetko, čo obsahuje základný balík</Text>
            </li>
          </BenefitsSection>
          <PlusWrapperFlex
            direction="column"
            gap="12px"
            alignItems="flex-start"
            gold
          >
            <Text weight="bold">Plus:</Text>
            <PlusBenefitsSection>
              <li>
                <Text>2 hodiny konzultácií</Text>
              </li>
              <li>
                <Text>Pomoc s tvorbou životopisu a portfólia</Text>
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
