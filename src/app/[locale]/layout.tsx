// src/app/[locale]/layout.tsx (DÜZELTİLMİŞ HALİ)

import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import NavbarWrapper from '@/components/NavbarWrapper';
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  
  // 💥 Düzeltilen Satır: 'params' zaten senkron bir obje olduğu için
  // 'await' ifadesi kaldırıldı. Bu, derleme hatanızı çözmelidir.
  const {locale} = params; 

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Dil dosyası bulunamadı: ${locale}, varsayılan Türkçe yüklendi.`);
    messages = (await import('@/messages/tr.json')).default;
  }

  if (!['tr', 'en'].includes(locale)) notFound();

  return (
    <html lang={locale}>
      <body className="bg-gray-900 text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavbarWrapper />
          <main className="p-6">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}