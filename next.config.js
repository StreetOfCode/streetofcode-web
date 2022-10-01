const removeImports = require('next-remove-imports')()
const {withSentryConfig} = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // strict mode creates error in VimeoPlayer - https://github.com/u-wave/react-vimeo/pull/175
  swcMinify: true,
  compiler: {
    styledComponents: true,
    emotion: true,
  },
  images: {
    domains: [
      'wp.streetofcode.sk',
      'lh3.googleusercontent.com',
      'process.env.WORDPRESS_API_URL.match(/(http(?:s)?:\\/\\/)(.*)/)[2]',
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
    }

    return config
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  hideSourceMaps: true,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// We use removeImports because of MDEditor (in react-admin part)
// https://github.com/uiwjs/react-md-editor
module.exports = withSentryConfig(
  removeImports(nextConfig),
  sentryWebpackPluginOptions,
)
