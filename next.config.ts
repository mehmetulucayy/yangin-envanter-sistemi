import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// ❌ YANLIŞ (Şu an yaptığınız):
// import nextIntlConfig from './src/i18n/request';
// const withNextIntl = createNextIntlPlugin(nextIntlConfig);

// ✅ DOĞRU (Yapmanız gereken):
// Dosya yolunu direkt string olarak verin
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Next.js 15'te serverActions varsayılan olarak açıktır,
  // experimental kısmını boş bırakabilir veya tamamen silebilirsiniz.
  experimental: {},
};

export default withNextIntl(nextConfig);