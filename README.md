# 🔥 Yangın Envanter Sistemi

Modern ve kullanıcı dostu yangın söndürme ekipmanları envanter yönetim sistemi. Next.js 15, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🌐 Canlı Demo

**[🚀 Uygulamayı Deneyin](https://yangin-envanter-sistemi-gsig-q56c1ddqp.vercel.app)**

## ✨ Özellikler

### 📊 Ana Sayfa
- **Anlık İstatistikler**: Toplam envanter, durum bazlı sayılar (Yeni, Kullanılmış, Bakımda, Kullanılamaz)
- **Yaklaşan Bakımlar**: 30 gün içinde son kullanma tarihi dolacak ekipmanların listesi
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu

### 📦 Envanter Yönetimi
- **Ekipman Ekleme**: Detaylı form ile yeni ekipman kaydı
- **Tablo Görünümü**: Tüm ekipmanları düzenli tabloda görüntüleme
- **Silme İşlemi**: Onay ile güvenli silme
- **LocalStorage**: Veriler tarayıcıda güvenle saklanır

### 📈 Raporlama
- **Grafikler**:
  - Aylık eklenen ürünler (Bar Chart)
  - Son kullanma tarihi dağılımı (Line Chart)
  - Durum dağılımı (Pie Chart)
- **PDF Export**: Tüm veriler ve grafiklerle birlikte PDF olarak indirilebilir
- **Türkçe Karakter Desteği**: PDF'de Türkçe karakterler düzgün görüntülenir

### 🌍 Çoklu Dil Desteği
- **Türkçe** 🇹🇷
- **İngilizce** 🇺🇸
- Dinamik dil değiştirme (URL tabanlı routing)
- Tüm sayfalarda tam çeviri desteği

## 🚀 Teknolojiler

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/)
- **Charts**: [Recharts](https://recharts.org/)
- **PDF**: [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- **Canvas**: [html2canvas](https://html2canvas.hertzen.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**:
```bash
git clone https://github.com/mehmetulucayy/yangin-envanter-sistemi.git
cd yangin-envanter-sistemi
```

2. **Bağımlılıkları yükleyin**:
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**:
```bash
npm run dev
```

4. **Tarayıcıda açın**:
```
http://localhost:3000
```

## 🏗️ Build

Production build oluşturmak için:

```bash
npm run build
npm start
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── [locale]/           # Dil bazlı routing
│   │   ├── page.tsx        # Ana sayfa
│   │   ├── layout.tsx      # Layout wrapper
│   │   ├── inventory/      # Envanter sayfası
│   │   └── reporting/      # Raporlama sayfası
│   └── globals.css         # Global stiller
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   └── NavbarWrapper.tsx   # Client wrapper
├── i18n/
│   ├── config.ts           # i18n konfigürasyonu
│   ├── request.ts          # Server-side i18n
│   └── routing.ts          # Routing konfigürasyonu
└── messages/
    ├── tr.json             # Türkçe çeviriler
    └── en.json             # İngilizce çeviriler
```

## 🌐 Dil Değiştirme

Sistem otomatik olarak URL tabanlı dil yönetimi kullanır:

- Türkçe: `https://your-domain.com/tr`
- İngilizce: `https://your-domain.com/en`

Navbar'daki dil değiştirme butonu ile kolayca geçiş yapabilirsiniz.

## 💾 Veri Saklama

Veriler tarayıcının **localStorage**'ında saklanır. Bu sayede:
- ✅ Sunucu gerektirmez
- ✅ Hızlı erişim
- ✅ Offline çalışma
- ⚠️ Tarayıcı verisi silinirse kaybolur

## 📸 Ekran Görüntüleri

### Ana Sayfa
- İstatistik kartları
- Yaklaşan bakımlar tablosu

### Envanter Yönetimi
- Ekipman ekleme formu
- Detaylı envanter tablosu

### Raporlama
- İnteraktif grafikler
- PDF export özelliği

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Mehmet Uluçay**

- GitHub: [@mehmetulucayy](https://github.com/mehmetulucayy)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) ekibine
- [Vercel](https://vercel.com/) hosting için
- Tüm açık kaynak katkıda bulunanlara

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
