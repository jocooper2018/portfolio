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
import { useContext, useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type WorkExperienceData from "../../interfaces/WorkExperiencesData";
import type WorkExperience from "../../interfaces/WorkExperience";
import DateRange from "../DateRange";
import type Tool from "../../interfaces/Tool";
import getTool from "../../utils/getTool";
import getIconUrlForTheme from "../../utils/getIconUrlForTheme";
import { ThemeContext } from "../../contexts/ThemeContext";
import OpenInNewIcon from "../../assets/icons/OpenInNewIcon";

interface WorkExperiencesSectionProps {
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
}

const WorkExperiencesSection: React.FC<WorkExperiencesSectionProps> = (
  props: WorkExperiencesSectionProps
) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  const [workExperiencesData, setWorkExperiencesData] = useState<
    WorkExperienceData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("work-experiences")) as
        | WorkExperienceData
        | false;
      if (!response) {
        return;
      }
      setWorkExperiencesData(response);
    })();
  }, []);

  return (
    <section id="work-experiences">
      <h2>{t("workExperiences")}</h2>
      {workExperiencesData &&
        workExperiencesData.workExperiences.map(
          (workExperience: WorkExperience, i: number) => (
            <article
              key={`work-experience-${i}`}
              className="work-experience card"
            >
              <div className="line">
                <h3>{workExperience.post[lang]}</h3>
                <div>
                  <DateRange
                    startDate={workExperience.startDate}
                    endDate={workExperience.endDate}
                  />
                </div>
              </div>
              <div className="line">
                <div>{workExperience.companyName}</div>
                <div>{workExperience.type[lang]}</div>
              </div>
              <div>{workExperience.location[lang]}</div>
              <p>{workExperience.description[lang]}</p>
              <ul className="tools">
                {workExperience.toolsIds.map((toolId: string, i: number) => {
                  if (props.isToolsLoading) {
                    return <div className="loader" />;
                  }
                  const tool = getTool(props.allTools, toolId);
                  if (!tool) {
                    console.error(`tool ${toolId} not found`);
                    return;
                  }
                  return (
                    <li key={`tool-${i}`}>
                      <a href={tool.url[lang]} target="_blank">
                        <img
                          src={getIconUrlForTheme(tool.logo, resolvedTheme)}
                          alt={tool.name}
                        />
                        <div className="popup">{tool.name}</div>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a href={workExperience.url[lang]} target="_blank" className="button">
                {t("webSite")}
                <OpenInNewIcon />
              </a>
            </article>
          )
        )}
    </section>
  );
};

export default WorkExperiencesSection;
