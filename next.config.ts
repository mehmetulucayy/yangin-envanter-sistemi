import createNextIntlPlugin from 'next-intl/plugin';
import nextIntlConfig from './src/i18n/request';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
};

const withNextIntl = createNextIntlPlugin(nextIntlConfig);

export default withNextIntl(nextConfig);
