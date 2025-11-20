// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/inventory': { 
      tr: '/envanter', // Klasör adı 'inventory' ama TR'de URL 'envanter' olacak
      en: '/inventory'
    },
    '/reporting': {
      tr: '/raporlama',
      en: '/reporting'
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);