'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // TR<->EN aynı sayfada kal, yalnızca locale + segment çevir
  const handleSwitch = () => {
    // rota çeviri eşlemesi
      const map: Record<string, string> = {
      '/envanter': '/inventory',
      '/inventory': '/envanter'
    };


    // locale’i değiştir
    let next = pathname.replace(/^\/(tr|en)/, `/${locale === 'tr' ? 'en' : 'tr'}`);

    // segment çevirisi gerekiyorsa uygula
    for (const [tr, en] of Object.entries(map)) {
      if (locale === 'tr' && pathname.includes(tr)) next = next.replace(tr, en);
      if (locale === 'en' && pathname.includes(en)) next = next.replace(en, tr);
    }

    router.push(next);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-semibold">{t('title')}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link className="hover:text-yellow-300" href={`/${locale}`}>
            {t('home')}
          </Link>
          <Link
            className="hover:text-yellow-300"
            href={`/${locale}/${locale === 'tr' ? 'envanter' : 'inventory'}`}
          >
            {t('inventory')}
          </Link>
          <Link
            className="hover:text-yellow-300"
            href={`/${locale}/reporting`}
          >
            {t('reporting')}
          </Link>

          <button
            onClick={handleSwitch}
            className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </nav>
  );
}
