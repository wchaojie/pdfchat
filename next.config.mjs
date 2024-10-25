/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname: "s.charealm.com",
      },
    ],
    unoptimized: true // 不优化，原样输出
  }
}

export default nextConfig
