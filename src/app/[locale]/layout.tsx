import { NextIntlClientProvider } from 'next-intl';
import NavbarWrapper from '@/components/NavbarWrapper';
import nextIntlConfig from '@/i18n/request';
import '../globals.css'; 
import type { LayoutProps } from 'next/dist/lib/app-router-context';

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = params;

  const { messages } = await nextIntlConfig({ locale });

  return (
    <html lang={locale}>
      <body className="bg-gray-900 text-white min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavbarWrapper />
          <main className="p-6">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
