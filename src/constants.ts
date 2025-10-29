export const DEFAULT_LOGO_IMAGE_URL =
  'https://wp.streetofcode.sk/wp-content/uploads/2022/10/purple-logo-small.jpg'

export const TERMS_OF_SERVICE_URL =
  'http://wp.streetofcode.sk/wp-content/uploads/2023/08/Obchodne-podmienky.pdf'

export const GDPR_URL =
  'http://wp.streetofcode.sk/wp-content/uploads/2023/08/GDPR.pdf'

export type CourseProductType = 'javaKurz' | 'sql' | 'webGames' | 'ai'

export const courseProductsConfig: {
  [key in CourseProductType]: {
    slug: string
    productIds: Record<string, string>
  }
} = {
  javaKurz: {
    slug: process.env.NEXT_PUBLIC_COURSE_PRODUCT_SLUG_JAVA_KURZ || 'java-kurz',
    productIds: {
      basic: process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_JAVA_KURZ_BASIC || '',
    },
  },
  sql: {
    slug: process.env.NEXT_PUBLIC_COURSE_PRODUCT_SLUG_SQL || 'sql-zaklady',
    productIds: {
      basic: process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_SQL || '',
    },
  },
  webGames: {
    slug: process.env.NEXT_PUBLIC_COURSE_PRODUCT_SLUG_WEB_GAMES || 'webove-hry',
    productIds: {
      basic: process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_WEB_GAMES || '',
    },
  },
  ai: {
    slug: process.env.NEXT_PUBLIC_COURSE_PRODUCT_SLUG_AI || 'ai',
    productIds: {
      basic: process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_AI || '',
    },
  }
} as const

export const courseProductsConstants: {
  [key in CourseProductType]: {
    name: string
    variants: {[key: string]: {variantName: string}}
  }
} = {
  javaKurz: {
    name: 'Java Kurz',
    variants: {
      [courseProductsConfig.javaKurz.productIds.basic]: {
        variantName: 'Java kurz',
      },
    },
  },
  sql: {
    name: 'SQL Základy',
    variants: {
      [courseProductsConfig.sql.productIds.basic]: {
        variantName: 'SQL Základy',
      },
    },
  },
  webGames: {
    name: 'Webové Hry: Pexeso, Had, 2048',
    variants: {
      [courseProductsConfig.webGames.productIds.basic]: {
        variantName: 'Webové Hry: Pexeso, Had, 2048',
      },
    },
  },
  ai: {
    name: 'Profesionálne programovanie s AI',
    variants: {
      [courseProductsConfig.ai.productIds.basic]: {
        variantName: 'Profesionálne programovanie s AI',
      },
    },
  },
} as const

export const getCourseProductName = (courseProductId: string): string => {
  const constants = Object.values(courseProductsConstants).find((value) => {
    return Object.keys(value.variants).includes(courseProductId)
  }) as (typeof courseProductsConstants)[CourseProductType]

  if (constants == null) return 'N/A'

  return `${constants.variants[courseProductId].variantName}`
}

export const COOKIE_CONSENT = 'cookiesConsent'
export const ONE_YEAR = 365 * 24 * 60 * 60
