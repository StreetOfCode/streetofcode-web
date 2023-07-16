import React from 'react'
import NextLink from './components/core/NextLink'
import {theodor, pavol} from './images'
import {routes} from './routes'
import {CourseReview} from './types'
import Text from './components/core/Text'

const theodorReviewText = `Sice už jsem zkušený programátor, ale na učení se jazyka Kotlin a celkově jeho nasazení v BE,
je tento kurz naprosto skvělý.
Hlavně konečně kurz nahrávaný i ve vysoké kvalitě a se super komentářem. Doporučuju!
`

export const springBootKotlinLink = (
  <NextLink styleIfActive href={routes.kurzy.slug('spring-boot-kotlin')}>
    <Text size="large" withAccentUnderline>
      Spring Boot - Kotlin
    </Text>
  </NextLink>
)

export const informatika101Link = (
  <NextLink styleIfActive href={routes.kurzy.slug('informatika-101')}>
    <Text size="large" withAccentUnderline>
      Informatika 101
    </Text>
  </NextLink>
)

export const theodorReview: CourseReview = {
  id: -1,
  userId: '',
  courseId: -1,
  rating: 5,
  text: theodorReviewText,
  staticImage: theodor,
  userName: 'Theodor Binar',
}

const pavolReviewText = `Tento kurz sa mi veľmi páči. Je vhodný aj pre laikov,
lebo Jakub v ňom vysvetľuje problematiku od základu. No zároveň tam nie sú zbytočnosti.
Výhodou sú aj praktické úlohy po každej lekcii vykonávané v nástroji, ktorý sa používa v bežnej praxi.
Z celého kurzu vidno, že si dal Jakub na tom záležať.
Nezanedbateľným bonusom je to, že je kurz zadarmo.`

export const pavolReview: CourseReview = {
  id: -1,
  userId: '',
  courseId: -1,
  rating: 5,
  text: pavolReviewText,
  staticImage: pavol,
  userName: 'Pavol Soták',
}
