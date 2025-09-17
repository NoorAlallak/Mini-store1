// src/components/LanguageSwitcher.jsx
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcherComponent() {
  // eslint-disable-next-line no-unused-vars
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  // whenever language changes, update html lang & dir attributes
  useEffect(() => {
    const current = i18n.language?.split("-")[0] || "en";
    setLang(current);

    // set lang attr for accessibility/search engines
    document.documentElement.lang = current;

    // set direction
    const dir = current === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;

    // optional: add a class so you can target with CSS: <html class="rtl">
    document.documentElement.classList.toggle("rtl", dir === "rtl");
    document.documentElement.classList.toggle("ltr", dir === "ltr");
  }, [i18n.language]);

  const switchTo = (lng) => {
    i18n.changeLanguage(lng);
    // i18next-browser-languagedetector + init caches to localStorage automatically
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchTo("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1 rounded cursor-pointer ${
          lang === "en" ? "bg-gray-200" : ""
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchTo("ar")}
        aria-pressed={lang === "ar"}
        className={`px-3 py-1 rounded cursor-pointer ${
          lang === "ar" ? "bg-gray-200" : ""
        }`}
      >
        العربية
      </button>
    </div>
  );
}
