import React from 'react'
import {default as _NextHead} from 'next/head'
import {DEFAULT_LOGO_IMAGE_URL} from '../constants'

type HeadProps = {
  description: string
  title: string
  url: string
  imageUrl?: string
  imageAlt?: string
  noIndex?: boolean
}

const Head = ({
  title,
  description,
  url,
  imageUrl,
  imageAlt,
  noIndex,
}: HeadProps) => {
  return (
    <_NextHead>
      <title>{title}</title>

      <meta property="og:site_name" content="Street of Code" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@StreetofCode1" />
      <meta property="og:locale" content="sk_SK" />
      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl || DEFAULT_LOGO_IMAGE_URL} />
      <meta property="og:image:alt" content={imageAlt || title} />

      <meta
        name="google-site-verification"
        content="FB24EUCOSSYhz39LdPTSNW4Yebc0El71AV7luRQcQQc"
      />
      {noIndex && <meta name="robots" content="noindex" />}
    </_NextHead>
  )
}

export default Head
