/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 için ekstra ayarlar (gerekirse)
  // experimental: {
  //   serverActions: true,
  // },
};

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig);