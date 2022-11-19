/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'links.papareact.com',
      'avatars.githubusercontent.com',
      'encrypted-tbn3.gstatic.com'
    ]
  },
  experimental: {
    appDir: true
  }
}
