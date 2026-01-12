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
import type ProjectData from "../../../interfaces/Project";
import type ButSkill from "../../../interfaces/ButSkill";
import { useLanguage } from "../../../contexts/LanguageContext";
import type Tool from "../../../interfaces/Tool";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import getIconUrlForTheme from "../../../utils/getIconUrlForTheme";
import DateRange from "../../DateRange";
import getButSkill from "../../../utils/getButSkill";
import PlayIcon from "../../../assets/icons/PlayIcon";
import ToolsList from "../../ToolsList";

interface ProjectProps {
  readonly data: ProjectData;
  readonly position: number;
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
  readonly allButSkills: ButSkill[];
  readonly isButSkillsLoading: boolean;
  readonly setImagesToView: React.Dispatch<
    React.SetStateAction<ProjectData | undefined>
  >;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  return (
    <article className={`project${props.position % 2 !== 0 ? " reverse" : ""}`}>
      <div className="card">
        <div className="header">
          <div>
            <h3>{props.data.name[lang]}</h3>
            <span className="project-type">{props.data.type[lang]}</span>
          </div>
          <div>
            <DateRange
              startDate={props.data.startDate}
              endDate={props.data.endDate}
            />
          </div>
        </div>
        <ul className="but-skills">
          {!props.isButSkillsLoading &&
            props.data.butSkillsIds.map((butSkillId: number, i: number) => (
              <li
                key={`but-skill-${i}`}
                title={
                  getButSkill(props.allButSkills, butSkillId)?.fullName[lang]
                }
              >
                {getButSkill(props.allButSkills, butSkillId)?.shortName[lang]}
              </li>
            ))}
        </ul>
        <p>{props.data.description[lang]}</p>
        <ToolsList
          everyTools={props.allTools}
          isToolsLoading={props.isToolsLoading}
          toolsIds={props.data.toolsIds}
        />
        {(props.data.repositoryLink || props.data.testLink) && (
          <div className="links">
            {props.data.repositoryLink && (
              <a
                href={props.data.repositoryLink}
                target="_blank"
                className="repository-link"
              >
                <img
                  src={(() => {
                    const tool = props.allTools.find(
                      (tool: Tool) => tool.id === "github"
                    );
                    return tool
                      ? getIconUrlForTheme(tool.logo, resolvedTheme)
                      : undefined;
                  })()}
                  alt=""
                />
                <div className="popup">{t("seeSourceCode")}</div>
              </a>
            )}
            {props.data.testLink && (
              <a
                href={props.data.testLink}
                target="_blank"
                className="test-link"
              >
                <PlayIcon />
                <div className="popup">{t("testProgram")}</div>
              </a>
            )}
          </div>
        )}
      </div>
      {props.data.images.length > 0 && (
        <img
          src={props.data.images[0].url}
          alt={props.data.images[0].alt[lang]}
          title={props.data.images[0].title[lang]}
          onClick={() => {
            props.setImagesToView(props.data);
          }}
        />
      )}
    </article>
  );
};

export default Project;
