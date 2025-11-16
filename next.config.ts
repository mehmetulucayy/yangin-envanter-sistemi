import createNextIntlPlugin from 'next-intl/plugin';

// 🌍 next-intl yapılandırmasını ekliyoruz
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ✅ true yerine boş obje
  },
};

// 🧩 next-intl eklentisini ana yapılandırmayla birleştiriyoruz
export default withNextIntl(nextConfig);
