/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    REMITA_KEY: process.env.REMITA_KEY,
    REMITA_SCRIPT_URL: process.env.REMITA_SCRIPT_URL,
  },
};

export default nextConfig;
