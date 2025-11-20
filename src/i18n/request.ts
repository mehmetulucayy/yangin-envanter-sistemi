import tr from '../messages/tr.json';
import en from '../messages/en.json';
import { getRequestConfig } from 'next-intl/server';

export const messagesMap = { tr, en };

const nextIntlConfig = getRequestConfig(({ locale }) => {
  const messages = messagesMap[locale] || tr;
  return {
    locale: locale || 'tr',
    messages,
  };
});

export default nextIntlConfig;
