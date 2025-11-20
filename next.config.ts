import createNextIntlPlugin from 'next-intl/plugin';
import nextIntlConfig from './src/i18n/request';

const withNextIntl = createNextIntlPlugin(nextIntlConfig);

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  experimental: {
    serverActions: {}, // boolean değil object olarak verilmeli
  },
});

export default nextConfig;
