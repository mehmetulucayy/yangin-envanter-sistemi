import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  let messages;
  try {
    messages = (await import(`../../i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Dil dosyası bulunamadı: ${locale}, varsayılan Türkçe yüklendi.`);
    messages = (await import('../messages/tr.json')).default;
  }

  return {
    locale: locale || 'tr', // ✅ Burada default locale belirt
    messages,
  };
});
