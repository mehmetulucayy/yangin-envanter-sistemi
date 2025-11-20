import { NextIntlClientProvider } from 'next-intl';
import NavbarWrapper from '@/components/NavbarWrapper';
import "../globals.css";
import nextIntlConfig from '@/i18n/request';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // nextIntlConfig kullanarak mesajları alıyoruz
  const { messages } = await nextIntlConfig({ locale });

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
