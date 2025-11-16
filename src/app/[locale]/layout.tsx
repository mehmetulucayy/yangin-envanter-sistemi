import { NextIntlClientProvider } from 'next-intl';
import NavbarWrapper from '@/components/NavbarWrapper';
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
  return (
    <html lang={params.locale}>
      <body className="bg-gray-900 text-white">
        <NextIntlClientProvider locale={params.locale}>
          <NavbarWrapper />
          <main className="p-6">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
