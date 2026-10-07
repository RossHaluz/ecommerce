import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.audiparts.com.ua",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Local backend (BACKEND_URL=http://localhost:3005) serves images too.
      {
        protocol: "http",
        hostname: "localhost",
        port: "3005",
        pathname: "/**",
      },
    ],
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

  // Усе тут вшивається в браузерний код. Секрети (токен monobank, ключі) сюди не додавати — лише серверний код через process.env.
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    STORE_ID: process.env.STORE_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    NEXT_PUBLIC_URL_ENDPOINT: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  },
};

export default withNextIntl(nextConfig);
