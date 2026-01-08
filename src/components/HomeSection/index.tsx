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
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import type PersonalInfosData from "../../interfaces/PersonalInfosData";
import getRessource from "../../utils/getRessource";

const HomeSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [personalInfosData, setPersonalInfoData] = useState<
    PersonalInfosData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("personal-infos")) as
        | PersonalInfosData
        | false;
      if (!response) {
        return;
      }
      setPersonalInfoData(response);
    })();
  }, []);

  return (
    <section id="home">
      {personalInfosData && (
        <div className="content">
          <span>{t("hello")}</span>
          <h1>
            <span>{personalInfosData.personalInfos.firstName}</span>{" "}
            <span>{personalInfosData.personalInfos.name}</span>
          </h1>
          <span className="status">{personalInfosData.personalInfos.status[lang]}</span>
          <p>{personalInfosData.personalInfos.pitch[lang]}</p>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
