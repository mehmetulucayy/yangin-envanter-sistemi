// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import tr from '../messages/tr.json';
import en from '../messages/en.json';

export default getRequestConfig(({ locale }) => {
  const messages = { tr, en }[locale] || tr;

  return {
    locale: locale || 'tr',
    messages
  };
});
