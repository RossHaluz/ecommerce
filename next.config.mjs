/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "localhost", "api.audiparts.site"],
  },

  experimental: {
    scrollRestoration: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    STORE_ID: process.env.STORE_ID,
    MONO_URL: process.env.MONO_URL,
    TOKEN_MONO: process.env.TOKEN_MONO,
    NOVA_POSHTA_URL: process.env.NOVA_POSHTA_URL,
    NOVA_POSHTA_KEY: process.env.NOVA_POSHTA_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig;
