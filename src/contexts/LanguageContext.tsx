/*
 *  A personal portfolio website to showcase projects.
 *  Copyright (C) 2026  Matthieu LE BOUT
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../langs/translations";
import type { Language } from "../types/Language";

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
    const regex = { fr: new RegExp("fr", "i"), en: new RegExp("en", "i") };
    if (regex.fr.test(lang)) {
      return "fr";
    } else if (regex.en.test(lang)) {
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
