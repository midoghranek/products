/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["default", "en", "ar"],
    defaultLocale: "default",
    localeDetection: false,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};
