const removeImports = require('next-remove-imports')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    emotion: true,
  },
  images: {
    domains: ['streetofcode.sk', 'googleusercontent.com'],
  },
}

// We use removeImports because of MDEditor (in react-admin part)
// https://github.com/uiwjs/react-md-editor
module.exports = removeImports(nextConfig)
