import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../langs/translations";

export type Language = "en" | "fr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  readonly children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

const detectBrowserLanguage = (): Language => {
  const storedLanguage = localStorage.getItem("lang") as Language | null;
  if (storedLanguage !== null) {
    return storedLanguage;
  }
  for (const lang of navigator.languages) {
    const regex = new RegExp("fr", "i");
    if (regex.test(lang)) {
      return "fr";
    } else if (regex.test(lang)) {
      return "en";
    }
  }
  return "en";
};

export const LanguageProvider: React.FC<LanguageProviderProps> = (
  props: LanguageProviderProps
) => {
  const [lang, setLang] = useState<Language>(detectBrowserLanguage());

  const t = (key: string) => {
    return translations[lang]?.[key] ?? key;
  };

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
