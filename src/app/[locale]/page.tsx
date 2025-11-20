'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = {
  id: number;
  tupadi: string;
  marka: string;
  model: string;
  seriNo: string;
  uretimYili: string;
  sonKullanmaTarihi: string; // ISO yyyy-mm-dd
  bulunduguYer: string;
  durum: 'Yeni' | 'Kullanılmış' | 'Bakımda' | 'Kullanılamaz';
};

export default function AnaSayfa() {
  const t = useTranslations('home');
  const [envanter, setEnvanter] = useState<Item[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('envanterListesi');
    if (raw) setEnvanter(JSON.parse(raw));
  }, []);

  const totals = useMemo(() => {
    const total = envanter.length;
    const countNew = envanter.filter(x => x.durum === 'Yeni').length;
    const countUsed = envanter.filter(x => x.durum === 'Kullanılmış').length;
    const countMaint = envanter.filter(x => x.durum === 'Bakımda').length;
    const countBad = envanter.filter(x => x.durum === 'Kullanılamaz').length;
    return { total, countNew, countUsed, countMaint, countBad };
  }, [envanter]);

  const upcoming = useMemo(() => {
    const today = new Date().getTime();
    const in30 = 30 * 24 * 60 * 60 * 1000;
    return envanter.filter(e => {
      if (!e.sonKullanmaTarihi) return false;
      const due = new Date(e.sonKullanmaTarihi).getTime();
      const diff = due - today;
      return diff > 0 && diff <= in30;
    });
  }, [envanter]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card title={t('cards.total')} value={totals.total} />
        <Card title={t('cards.new')} value={totals.countNew} />
        <Card title={t('cards.used')} value={totals.countUsed} />
        <Card title={t('cards.maintenance')} value={totals.countMaint} />
        <Card title={t('cards.unusable')} value={totals.countBad} />
      </div>

      {/* upcoming */}
      <div className="bg-[#1C1F26] border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t('upcoming')}</h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-400 italic">{t('none')}</p>
        ) : (
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="py-2 pr-4 w-1/5">{t('table.cylinder')}</th>
                <th className="py-2 pr-4 w-1/5">{t('table.brand')}</th>
                <th className="py-2 pr-4 w-1/5">{t('table.serialNo')}</th>
                <th className="py-2 pr-4 w-1/5">{t('table.expiry')}</th>
                <th className="py-2 pr-4 w-1/5">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map(e => (
                <tr key={e.id} className="border-t border-gray-800">
                  <td className="py-2 pr-4 w-1/5 truncate">{e.tupadi}</td>
                  <td className="py-2 pr-4 w-1/5 truncate">{e.marka}</td>
                  <td className="py-2 pr-4 w-1/5 truncate">{e.seriNo}</td>
                  <td className="py-2 pr-4 w-1/5 truncate">{e.sonKullanmaTarihi}</td>
                  <td className="py-2 pr-4 w-1/5 truncate">{e.durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-[#1C1F26] border border-gray-800 rounded-lg p-6 text-center">
      <div className="text-gray-300 mb-2">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
