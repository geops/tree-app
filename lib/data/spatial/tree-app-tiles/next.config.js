/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/tree/:path*',
        destination: '/api/tree/:path*',
      },
      {
        source: '/fonts/:path*',
        destination: '/api/fonts/:path*',
      },
    ];
  },
};

export default nextConfig;