"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Tip tanımlamasını yapalım (Kodunuzdaki "any[]" yerine daha temiz olur)
interface EnvanterKaydi {
  id: number;
  tupadi: string;
  marka: string;
  model: string;
  seriNo: string;
  uretimYili: string;
  sonKullanmaTarihi: string;
  bulunduguYer: string;
  durum: string;
}

const initialFormState: Omit<EnvanterKaydi, 'id'> = {
  tupadi: "",
  marka: "",
  model: "",
  seriNo: "",
  uretimYili: "",
  sonKullanmaTarihi: "",
  bulunduguYer: "",
  durum: "New",
};

export default function InventoryPage() {
  const t = useTranslations("inventory");

  const [envanterListesi, setEnvanterListesi] = useState<EnvanterKaydi[]>([]);
  const [form, setForm] = useState(initialFormState);

  // --- LOCAL STORAGE & INIT ---
  useEffect(() => {
    const kayitlar = localStorage.getItem("envanterListesi");
    if (kayitlar) setEnvanterListesi(JSON.parse(kayitlar));
  }, []);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yeni = [...envanterListesi, { id: Date.now(), ...form }];
    setEnvanterListesi(yeni);
    localStorage.setItem("envanterListesi", JSON.stringify(yeni));
    setForm(initialFormState); // Formu temizle
  };

  // ✅ YENİ İŞLEV: Kayıt Silme
  const handleDelete = (id: number) => {
    if (confirm(t("confirmDelete"))) {
      const yeni = envanterListesi.filter(item => item.id !== id);
      setEnvanterListesi(yeni);
      localStorage.setItem("envanterListesi", JSON.stringify(yeni));
    }
  };

  // ✅ Yardımcı Fonksiyon: Durum Çevirisi
  const getStatusTranslation = (durumKey: string) => {
    // Örneğin, 'New' key'i için 'status.new' çevirisini çağırır.
    return t(`status.${durumKey.toLowerCase()}`); 
  };
  
  // --- JSX RENDER ---
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">{t("title")}</h1>

      {/* Form Bölümü (Değişiklik Yok) */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1C1F26] p-8 rounded-2xl shadow-lg border border-[#2C3240] mb-12"
      >
        {/* ... (Form inputları ve butonları aynı) ... */}
        <h2 className="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-3">
          {t("addEquipment")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"> {/* Sütun sayısı 4 yapıldı */}
          <input name="tupadi" placeholder={t("fields.tupadi")} value={form.tupadi} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="marka" placeholder={t("fields.marka")} value={form.marka} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="model" placeholder={t("fields.model")} value={form.model} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="seriNo" placeholder={t("fields.seriNo")} value={form.seriNo} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="uretimYili" placeholder={t("fields.uretimYili")} value={form.uretimYili} onChange={handleChange} type="number" className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="sonKullanmaTarihi" placeholder={t("fields.sonKullanmaTarihi")} value={form.sonKullanmaTarihi} onChange={handleChange} type="date" className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="bulunduguYer" placeholder={t("fields.bulunduguYer")} value={form.bulunduguYer} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select name="durum" value={form.durum} onChange={handleChange} className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="New">{t("status.new")}</option>
            <option value="Used">{t("status.used")}</option>
            <option value="Maintenance">{t("status.maintenance")}</option>
            <option value="Unusable">{t("status.unusable")}</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-all">
            {t("addButton")}
          </button>
        </div>
      </form>


      {/* ✅ YENİ: Liste yerine Tablo */}
      <div className="bg-[#1C1F26] p-8 rounded-2xl shadow-lg border border-[#2C3240] overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-3">
          {t("listTitle")}
        </h2>
        {envanterListesi.length === 0 ? (
          <p className="text-gray-400 italic">{t("noItems")}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#2A303C]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.tupadi")}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.marka")}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.seriNo")}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.uretimYili")}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.sonKullanmaTarihi")}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t("fields.durum")}</th>
                <th className="px-4 py-3"></th> {/* Silme butonu için boş sütun */}
              </tr>
            </thead>
            <tbody className="bg-[#1C1F26] divide-y divide-gray-800">
              {envanterListesi.map((item) => (
                <tr key={item.id} className="hover:bg-[#20242b] transition duration-150">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{item.tupadi}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{item.marka} / {item.model}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{item.seriNo}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{item.uretimYili}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-400">{item.sonKullanmaTarihi}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.durum === 'New' ? 'bg-green-100 text-green-800' : item.durum === 'Unusable' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {getStatusTranslation(item.durum)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title={t("deleteButton")}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}