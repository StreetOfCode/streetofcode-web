const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'

const root = '/'
const admin = '/admin'

const clanky = {
  index: '/clanky',
  slug: (slug: string) => `/clanky/${slug}`,
  tag: (tag: string) => `/clanky/tag/${tag}`,
}

const videa = {
  index: '/videa',
  slug: (slug: string) => `/videa/${slug}`,
}

const podcast = {
  index: '/podcast',
  slug: (slug: string) => `/podcast/${slug}`,
  tag: (tag: string) => `/podcast/tag/${tag}`,
}

const kurzy = {
  index: '/kurzy',
  stranka: (pageNumber: number) => `/kurzy/stranka/${pageNumber}`,
  slug: (slug: string) => `/kurzy/${slug}`,
  zdroje: (slug: string) => `/kurzy/${slug}/zdroje`,
  lekcia: (slug: string, chapterId: number, lectureId: number) =>
    `/kurzy/${slug}/kapitola/${chapterId}/lekcia/${lectureId}`,
}

const login = {
  index: '/login',
  redirectUri: (redirectUri: string) => `/login/${redirectUri}`,
}

const lektor = {
  slug: (slug: string) => `/lektor/${slug}`,
}

const checkout = {
  courseProduct: (courseSlug: string, productId: string) =>
    `/checkout/${courseSlug}/${productId}`,
  success: (
    courseSlug: string,
    productId: string,
    appliedPromoCode: string | null,
    finalPrice: number,
  ) =>
    `/checkout/${courseSlug}/${productId}/success?appliedPromoCode=${
      appliedPromoCode || ''
    }&finalAmount=${finalPrice}`,
}

const feedback = '/feedback'
const newsletter = '/newsletter'
const oProjekte = '/o-projekte'
const onboarding = '/onboarding'
const profil = '/profil'

const github = '/github'
const facebook = '/facebook'
const spotify = '/spotify'
const patreon = '/patreon'
const discord = '/discord'
const instagram = '/instagram'
const youtube = '/youtube'
const dvePercenta = '2-percenta'

export const routes = {
  host,
  root,
  admin,
  clanky,
  videa,
  podcast,
  kurzy,
  login,
  lektor,
  feedback,
  dvePercenta,
  newsletter,
  oProjekte,
  onboarding,
  profil,
  checkout,

  github,
  facebook,
  spotify,
  patreon,
  discord,
  instagram,
  youtube,
}

export const prefixWithHost = (route: string) => `${host}${route}`
