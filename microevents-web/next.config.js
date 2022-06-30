/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/foos',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
