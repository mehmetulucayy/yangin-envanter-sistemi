"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function EnvanterPage() {
  const t = useTranslations("inventory");

  const [envanterListesi, setEnvanterListesi] = useState<any[]>([]);
  const [form, setForm] = useState({
    tupadi: "",
    marka: "",
    model: "",
    seriNo: "",
    uretimYili: "",
    sonKullanmaTarihi: "",
    bulunduguYer: "",
    durum: "Yeni",
  });

  useEffect(() => {
    const kayitlar = localStorage.getItem("envanterListesi");
    if (kayitlar) setEnvanterListesi(JSON.parse(kayitlar));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yeni = [...envanterListesi, { id: Date.now(), ...form }];
    setEnvanterListesi(yeni);
    localStorage.setItem("envanterListesi", JSON.stringify(yeni));
    setForm({
      tupadi: "",
      marka: "",
      model: "",
      seriNo: "",
      uretimYili: "",
      sonKullanmaTarihi: "",
      bulunduguYer: "",
      durum: "Yeni",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">{t("title")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1C1F26] p-8 rounded-2xl shadow-lg border border-[#2C3240] mb-12"
      >
        <h2 className="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-3">
          {t("addEquipment")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input
            name="tupadi"
            placeholder={t("fields.tupadi")}
            value={form.tupadi}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="marka"
            placeholder={t("fields.marka")}
            value={form.marka}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="model"
            placeholder={t("fields.model")}
            value={form.model}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="seriNo"
            placeholder={t("fields.seriNo")}
            value={form.seriNo}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="uretimYili"
            placeholder={t("fields.uretimYili")}
            value={form.uretimYili}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="sonKullanmaTarihi"
            placeholder={t("fields.sonKullanmaTarihi")}
            value={form.sonKullanmaTarihi}
            onChange={handleChange}
            type="date"
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="bulunduguYer"
            placeholder={t("fields.bulunduguYer")}
            value={form.bulunduguYer}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="durum"
            value={form.durum}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#2A303C] text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Yeni">{t("status.new")}</option>
            <option value="Kullanılmış">{t("status.used")}</option>
            <option value="Bakımda">{t("status.maintenance")}</option>
            <option value="Kullanılamaz">{t("status.unusable")}</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-all"
          >
            {t("addButton")}
          </button>
        </div>
      </form>

      <div className="bg-[#1C1F26] p-8 rounded-2xl shadow-lg border border-[#2C3240]">
        <h2 className="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-3">
          {t("listTitle")}
        </h2>

        {envanterListesi.length === 0 ? (
          <p className="text-gray-400 italic">{t("noItems")}</p>
        ) : (
          <ul className="space-y-3">
            {envanterListesi.map((item) => (
              <li
                key={item.id}
                className="bg-[#2A303C] p-4 rounded-lg flex justify-between items-center hover:bg-[#323846] transition"
              >
                <div>
                  <span className="font-semibold text-white">{item.tupadi}</span>{" "}
                  <span className="text-gray-400">— {item.marka}</span>
                </div>
                <span className="text-sm text-gray-300">{item.durum}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
