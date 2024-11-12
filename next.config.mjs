/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    REMITA_SCRIPT_URL: process.env.REMITA_SCRIPT_URL,
    REMITA_KEY: process.env.REMITA_KEY,
    REMITA_SERVICE_ID: process.env.REMITA_SERVICE_ID,
    MERCHANT_ID: process.env.MERCHANT_ID,
    REMITA_APIKEY: process.env.REMITA_APIKEY,
    REMITA_URL: process.env.REMITA_URL,
  },
};

export default nextConfig;
