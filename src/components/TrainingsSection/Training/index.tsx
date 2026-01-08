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
import { useLanguage } from "../../../contexts/LanguageContext";
import type TrainingData from "../../../interfaces/Training";
import OpenInNewIcon from "../../../assets/icons/OpenInNewIcon";
import DateRange from "../../DateRange";

interface TrainingProps {
  readonly data: TrainingData;
}

const Training: React.FC<TrainingProps> = (props: TrainingProps) => {
  const { t, lang } = useLanguage();

  return (
    <article className="training card">
      <div className="line">
        <h3>{props.data.certificateName[lang]}</h3>
        <div>{props.data.specialty[lang]}</div>
      </div>
      <div className="line">
        <div>{props.data.schoolName[lang]}</div>
        <div>
          <DateRange
            startDate={props.data.startDate}
            endDate={props.data.endDate}
          />
        </div>
      </div>
      <p>{props.data.description[lang]}</p>
      <a href={props.data.url[lang]} target="_blank" className="button">
        {t("webSite")}
        <OpenInNewIcon />
      </a>
    </article>
  );
};

export default Training;
