// src/app/[locale]/layout.tsx (İKİNCİ DÜZELTME DENEMESİ)

import {NextIntlClientProvider} from 'next-intl';
import NavbarWrapper from '@/components/NavbarWrapper';
import getMessages from '@/i18n/getMessages'; // Yeni fonksiyonu import edin
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  
  // Senkron erişim
  const {locale} = params; 

  // Mesajları ayrı fonksiyondan çekin
  const messages = await getMessages(locale);
  // getMessages fonksiyonu zaten notFound() kontrolünü içeriyor.

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