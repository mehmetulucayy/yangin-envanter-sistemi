import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NavbarWrapper from '@/components/NavbarWrapper';
import '../globals.css';
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Next.js 15'te burası Promise olmak zorunda
};

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js 15 kuralı: params'ı await ediyoruz
  const { locale } = await params;

  // Mesajları sunucu tarafında güvenli şekilde çekiyoruz
  const messages = await getMessages();
  // hamza
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