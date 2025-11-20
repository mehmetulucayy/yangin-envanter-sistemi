import createNextIntlPlugin from 'next-intl/plugin';
import nextIntlConfig from './src/i18n/request';

const withNextIntl = createNextIntlPlugin(nextIntlConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};

export default withNextIntl(nextConfig);
