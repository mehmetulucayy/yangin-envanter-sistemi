// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Kendi routing ayarlarımızı import ediyoruz

export default createMiddleware(routing);

export const config = {
  // Bu matcher, /tr/ ve /en/ ön eklerini ve ana sayfayı yakalar
  matcher: ['/', '/(tr|en)/:path*'] 
};