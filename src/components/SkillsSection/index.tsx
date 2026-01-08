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
import type SkillsData from "../../interfaces/SkillsData";
import type Skill from "../../interfaces/Skill";
import type Tool from "../../interfaces/Tool";
import { ThemeContext } from "../../contexts/ThemeContext";
import getIconUrlForTheme from "../../utils/getIconUrlForTheme";
import getTool from "../../utils/getTool";

interface SkillsSectionProps {
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
}

const mediaQuery: MediaQueryList = window.matchMedia(
  "screen and (max-width: 830px)"
);

const SkillsSection: React.FC<SkillsSectionProps> = (
  props: SkillsSectionProps
) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);
  const [skillsData, setSkillsData] = useState<SkillsData | undefined>(
    undefined
  );
  const [skillSelected, setSkillSelected] = useState<number>(0);
  const [mobileDisplay, setMobileDisplay] = useState<boolean>(
    mediaQuery.matches
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("skills")) as SkillsData | false;
      if (!response) {
        return;
      }
      setSkillsData(response);
    })();
    window.addEventListener("resize", () => {
      setMobileDisplay(mediaQuery.matches);
    });
  }, []);

  return (
    <section id="skills">
      <h2>{t("skills")}</h2>
      {skillsData &&
        (mobileDisplay ? (
          <ul className="skills-box">
            {skillsData.skills.map((skill: Skill) => (
              <li className="card">
                <h3>{skill.name[lang]}</h3>
                <ul className="tools">
                  {skill.toolsIds.map((toolId: string, i: number) => {
                    if (props.isToolsLoading) {
                      return <div className="loader" />;
                    }
                    const tool = getTool(props.allTools, toolId);
                    if (!tool) {
                      console.error(`tool ${toolId} not found`);
                      return;
                    }
                    return (
                      <li key={i}>
                        <a href={tool.url[lang]} target="_blank">
                          <img
                            src={getIconUrlForTheme(tool.logo, resolvedTheme)}
                            alt={`${tool.name} logo`}
                          />
                          <span className="tool-name">{tool.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="skills-box">
            <div className="skills-buttons">
              {skillsData.skills.map((skill: Skill, i: number) => (
                <button
                  type="button"
                  key={i}
                  className={skillSelected === i ? "selected" : ""}
                  onClick={() => {
                    setSkillSelected(i);
                  }}
                >
                  {skill.name[lang]}
                </button>
              ))}
            </div>
            <div className="tools card">
              <ul>
                {skillsData.skills[skillSelected].toolsIds.map(
                  (toolId: string, i: number) => {
                    if (props.isToolsLoading) {
                      return <div className="loader" />;
                    }
                    const tool = getTool(props.allTools, toolId);
                    if (!tool) {
                      console.error(`tool ${toolId} not found`);
                      return;
                    }
                    return (
                      <li key={i}>
                        <a href={tool.url[lang]} target="_blank">
                          <img
                            src={getIconUrlForTheme(tool.logo, resolvedTheme)}
                            alt={`${tool.name} logo`}
                          />
                          <span className="tool-name">{tool.name}</span>
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        ))}
    </section>
  );
};

export default SkillsSection;
