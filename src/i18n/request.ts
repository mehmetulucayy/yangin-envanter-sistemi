// src/i18n/request.ts
import tr from '../messages/tr.json';
import en from '../messages/en.json';
import { getRequestConfig } from 'next-intl/server';

const messagesMap = { tr, en };

export default getRequestConfig(async ({ locale }) => {
  const messages = messagesMap[locale] || tr;

  return {
    locale: locale || 'tr',
    messages,
  };
});
