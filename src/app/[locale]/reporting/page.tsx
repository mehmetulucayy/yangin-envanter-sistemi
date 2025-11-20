"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { toast } from "sonner";

// Type definitions for chart data
type MonthlyData = { month: string; count: number };
type ExpiryData = { month: string; count: number };
type StatusData = { name: string; value: number; color: string };
type BrandData = { name: string; value: number };
type LocationData = { name: string; count: number };

export default function RaporlamaPage() {
  const t = useTranslations("reporting");
  const [data, setData] = useState<any[]>([]);
  const [charts, setCharts] = useState<{
    monthly: MonthlyData[];
    expiry: ExpiryData[];
    status: StatusData[];
    brand: BrandData[];
    location: LocationData[];
  }>({
    monthly: [],
    expiry: [],
    status: [],
    brand: [],
    location: [],
  });

  const COLORS = {
    new: "#22c55e",
    used: "#3b82f6",
    maintenance: "#eab308",
    unusable: "#ef4444",
  };

  const chartRefs = {
    monthly: useRef<HTMLDivElement>(null),
    expiry: useRef<HTMLDivElement>(null),
    status: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("envanterListesi") || "[]");

    const normalized = stored.map((x: any) => ({
      name: x.tupadi,
      brand: x.marka,
      expiryDate: x.sonKullanmaTarihi,
      location: x.bulunduguYer,
      status:
        x.durum === "Yeni"
          ? "new"
          : x.durum === "Kullanılmış"
            ? "used"
            : x.durum === "Bakımda"
              ? "maintenance"
              : "unusable",
      createdAt: x.createdAt || new Date().toISOString(),
    }));

    setData(normalized);
    if (normalized.length === 0) return;

    const monthCounts: Record<string, number> = {};
    normalized.forEach((item: any) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const monthly = Object.entries(monthCounts).map(([month, count]) => ({
      month,
      count,
    }));

    const expiryCounts: Record<string, number> = {};
    normalized.forEach((item: any) => {
      if (!item.expiryDate) return;
      const date = new Date(item.expiryDate);
      const month = date.toLocaleString("default", { month: "short" });
      expiryCounts[month] = (expiryCounts[month] || 0) + 1;
    });
    const expiry = Object.entries(expiryCounts).map(([month, count]) => ({
      month,
      count,
    }));

    const statuses = ["new", "used", "maintenance", "unusable"];
    const status = statuses.map((s) => ({
      name: t(`statuses.${s}`),
      value: normalized.filter((i: any) => i.status === s).length,
      color: COLORS[s as keyof typeof COLORS],
    }));

    const brandCounts: Record<string, number> = {};
    normalized.forEach((i: any) => {
      const brand = i.brand || "Belirtilmemiş";
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });
    const brand = Object.entries(brandCounts).map(([brand, count]) => ({
      name: brand,
      value: count,
    }));

    const locationCounts: Record<string, number> = {};
    normalized.forEach((i: any) => {
      const loc = i.location || "Belirtilmemiş";
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });
    const location = Object.entries(locationCounts).map(([loc, count]) => ({
      name: loc,
      count,
    }));

    setCharts({ monthly, expiry, status, brand, location });
  }, [t]);

  // 📄 PDF dışa aktarma
  const handleExportPDF = async () => {
    const doc = new jsPDF({ compress: true });
    doc.setFont("Helvetica", "normal");

    // Başlık
    doc.setFontSize(18);
    doc.text("🔥 Yangın Envanter Sistemi Raporu", 14, 20);
    doc.setFontSize(12);
    doc.text(
      `Tarih: ${new Date().toLocaleDateString("tr-TR")} | Toplam Ürün: ${data.length
      }`,
      14,
      30
    );

    // Tablo
    autoTable(doc, {
      startY: 40,
      styles: { font: "Helvetica", fontStyle: "normal", halign: "center" },
      head: [["Tüp Adı", "Marka", "Durum", "Son Kullanma", "Lokasyon"]],
      body: data.map((x) => [
        x.name,
        x.brand,
        t(`statuses.${x.status}`),
        x.expiryDate || "-",
        x.location,
      ]),
    });

    let yPos = (doc as any).lastAutoTable.finalY + 10;

    // Grafik ekran görüntüleri
    for (const ref of Object.values(chartRefs)) {
      if (!ref.current) continue;
      const canvas = await html2canvas(ref.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 15, yPos, 180, 80);
      yPos += 90;
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    }

    doc.save("Envanter_Raporu.pdf");
    toast.success(t("exportSuccess"));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>

      <div ref={chartRefs.monthly}>
        <ChartCard title={`📅 ${t("charts.addedPerMonth")}`}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.monthly}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div ref={chartRefs.expiry}>
        <ChartCard title={`⏳ ${t("charts.expiryTimeline")}`}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={charts.expiry}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div ref={chartRefs.status}>
        <ChartCard title={`📦 ${t("charts.statusDistribution")}`}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={charts.status}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {charts.status.map((entry: any, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
        >
          {t("exportPDF") || "Raporu Dışa Aktar (PDF)"}
        </button>
      </div>
    </div>
  );
}

// 🔹 Grafik kutusu bileşeni
function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-800 p-6 rounded-2xl shadow space-y-4 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
