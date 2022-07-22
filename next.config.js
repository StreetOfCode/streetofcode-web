const removeImports = require('next-remove-imports')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    emotion: true,
  },

}

module.exports = removeImports(nextConfig)
