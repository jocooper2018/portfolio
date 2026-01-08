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

import "./index.css";
import { useEffect, useState } from "react";
import type AboutMeData from "../../interfaces/AboutMeData";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type { TranslatedString } from "../../types/Language";

const AboutMeSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [aboutMeData, setAboutMeData] = useState<AboutMeData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("about-me")) as AboutMeData | false;
      if (!response) {
        return;
      }
      setAboutMeData(response);
    })();
  }, []);

  return (
    <section id="about-me">
      <h2>{t("whoAmI")}</h2>
      {aboutMeData && (
        <div>
          <div className="card">
            {aboutMeData.aboutMe.paragraphs.map(
              (p: TranslatedString, i: number) => (
                <p key={`p-${i}`}>{p[lang]}</p>
              )
            )}
          </div>
          <img
            src={`${import.meta.env.BASE_URL}${aboutMeData.aboutMe.photo.url}`}
            alt={aboutMeData.aboutMe.photo.alt[lang]}
          />
        </div>
      )}
    </section>
  );
};

export default AboutMeSection;
