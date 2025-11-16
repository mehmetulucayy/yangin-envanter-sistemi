🔥 Yangın Envanter Takip Sistemi

Next.js + Tailwind CSS + i18n

Bu proje, kurum ve tesislerdeki yangın ekipmanlarının envanterini dijital olarak takip etmek, raporlamak ve çoklu dil desteği ile kullanıcı deneyimini geliştirmek için oluşturulmuş modern bir web uygulamasıdır.

Next.js 13 App Router, TailwindCSS, TypeScript, i18n (TR/EN) ile geliştirilmiştir.

--------------------------------------------------------------------------------------------------------------------------

🚀 Özellikler

Envanter Listeleme (En/Tr dil desteği)

Yangın ekipmanı veri yönetimi

Modern UI (Tailwind + Next.js)

Reporting Sayfası (Grafik bazlı)

Sayfa bazlı çoklu dil desteği (i18n)

Tamamen local çalışan demo

Dark tema tasarım

App Router yapısı (Next.js 13/14)

--------------------------------------------------------------------------------------------------------------------------

🛠️ Kullanılan Teknolojiler

| Teknoloji                     | Kullanım                               |
| ----------------------------- | -------------------------------------- |
| **Next.js 13 App Router**     | Proje yapısı, server/client components |
| **TypeScript**                | Tip güvenliği                          |
| **TailwindCSS**               | UI tasarımı                            |
| **i18n (JSON message files)** | Çoklu dil desteği                      |
| **Local Storage / Mock Data** | Geçici veri yönetimi                   |


--------------------------------------------------------------------------------------------------------------------------


📁 Proje Yapısı

yangin-envater-sistemi/
│
├── public/
│   └── (statik dosyalar)
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── envanter/
│   │   │   │   └── page.tsx
│   │   │   ├── inventory/
│   │   │   │   └── page.tsx
│   │   │   ├── reporting/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── NavbarWrapper.tsx
│   │
│   ├── messages/
│   │   ├── en.json
│   │   └── tr.json
│   │
│   └── i18n/
│       └── request.ts
│
├── next.config.js
├── next-intl.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
└── README.md


--------------------------------------------------------------------------------------------------------------------------

📸 Ekran Görselleri

Ana Ekran
Home

Envanter Ekranları
English	Türkçe

	
Raporlama Ekranları
English	Türkçe

--------------------------------------------------------------------------------------------------------------------------


🔧 Kurulum ve Çalıştırma

Repoyu klonla
  git clone https://github.com/mehmetulucayy/yangin-envater-sistemi.git

Bağımlılıkları kur
  npm install

Development modunda çalıştır
  npm run dev

--------------------------------------------------------------------------------------------------------------------------


Dil Desteği (i18n)

JSON dosyaları:

/src/messages/en.json

/src/messages/tr.json

Dil, URL üzerinden belirlenir:
