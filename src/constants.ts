export const DEFAULT_LOGO_IMAGE_URL =
  'https://wp.streetofcode.sk/wp-content/uploads/2022/10/purple-logo-small.jpg'

export const TERMS_OF_SERVICE_URL =
  'http://wp.streetofcode.sk/wp-content/uploads/2023/08/Obchodne-podmienky.pdf'

export const GDPR_URL =
  'http://wp.streetofcode.sk/wp-content/uploads/2023/08/GDPR.pdf'

export type CourseProductType = 'javaKurz'

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
      pro: process.env.NEXT_PUBLIC_COURSE_PRODUCT_ID_JAVAKURZ_SLUG || '',
    },
  },
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
        variantName: 'Základný kurz',
      },
      [courseProductsConfig.javaKurz.productIds.pro]: {
        variantName: 'Pro verzia',
      },
    },
  },
} as const

export const getCourseProductName = (courseProductId: string): string => {
  const constants = Object.values(courseProductsConstants).find((value) => {
    return Object.keys(value.variants).includes(courseProductId)
  }) as (typeof courseProductsConstants)[CourseProductType]

  if (constants == null) return 'N/A'

  return `${constants.name} - ${constants.variants[courseProductId].variantName}`
}
