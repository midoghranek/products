/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["DEFAULT_LANG", "en", "ar"],
    defaultLocale: "DEFAULT_LANG",
    localeDetection: false,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};
