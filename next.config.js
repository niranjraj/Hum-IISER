/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SECRET: process.env.SECRET,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;
