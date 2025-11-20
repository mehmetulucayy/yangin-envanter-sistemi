'use client';

// Yönlendirme için kendi oluşturduğumuz routing dosyasından import ediyoruz
import { Link, usePathname, useRouter } from '@/i18n/routing'; 
import { useLocale, useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    // Bu metod, URL ön ekini (/tr -> /en) ve yolu (/envanter -> /inventory) otomatik değiştirir.
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-semibold">{t('title')}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link className="hover:text-yellow-300" href="/">
            {t('home')}
          </Link>
          
          {/* Link olarak routing.ts'de tanımlanan anahtarı (klasör adını) kullanıyoruz */}
          <Link className="hover:text-yellow-300" href="/inventory">
            {t('inventory')}
          </Link>
          
          <Link className="hover:text-yellow-300" href="/reporting">
            {t('reporting')}
          </Link>

          <button
            onClick={handleSwitch}
            className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-white border border-gray-700"
          >
            {locale === 'tr' ? '🇺🇸 EN' : '🇹🇷 TR'}
          </button>
        </div>
      </div>
    </nav>
  );
}