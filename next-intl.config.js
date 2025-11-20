// next-intl.config.js (DOĞRU VE SON VERSİYON)
module.exports = {
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localeDetection: true,
  pathnames: {
    "/": {
      tr: "/",
      en: "/",
    },
    "/inventory": {
      tr: "/envanter",
      en: "/inventory",
    },
    "/reporting": {
      tr: "/raporlama", // ✅ DÜZELTİLDİ
      en: "/reporting",
    },
  },
};