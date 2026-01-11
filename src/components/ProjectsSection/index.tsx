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
import type ProjectsData from "../../interfaces/ProjectsData";
import type ProjectData from "../../interfaces/Project";
import Project from "./Project";
import type Tool from "../../interfaces/Tool";
import type ButSkill from "../../interfaces/ButSkill";
import Select, { type SelectOption } from "../Select";
import MultiSelect from "../MultiSelect";
import getIconUrlForTheme from "../../utils/getIconUrlForTheme";
import { ThemeContext } from "../../contexts/ThemeContext";
import type Image from "../../interfaces/Image";

interface ProjectsSectionProps {
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
  readonly allButSkills: ButSkill[];
  readonly isButSkillsLoading: boolean;
  readonly setImagesToView: React.Dispatch<
    React.SetStateAction<Image[] | undefined>
  >;
}

type SortByType = "end-date" | "name";
type SortOrderType = "asc" | "desc";

const ProjectsSection: React.FC<ProjectsSectionProps> = (
  props: ProjectsSectionProps
) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  const [projectsData, setProjectsData] = useState<ProjectsData | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState<SortByType>("end-date");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
  const [butSkillFilter, setButSkillFilter] = useState<SelectOption[]>([]);
  const [toolsFilter, setToolsFilter] = useState<SelectOption[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<SelectOption[]>(
    []
  );

  const sortFns: Record<
    SortByType,
    (a: ProjectData, b: ProjectData) => number
  > = {
    "end-date": (a: ProjectData, b: ProjectData): number => {
      let timeA: number;
      let timeB: number;
      const now = new Date().getTime();
      if (a.endDate) {
        timeA = new Date(a.endDate).getTime();
      } else {
        timeA = now;
      }
      if (b.endDate) {
        timeB = new Date(b.endDate).getTime();
      } else {
        timeB = now;
      }
      if (sortOrder === "asc") {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    },
    name: (a: ProjectData, b: ProjectData): number => {
      let result: number = 0;
      if (a.name[lang] < b.name[lang]) {
        result = -1;
      } else if (a.name[lang] > b.name[lang]) {
        result = 1;
      }
      if (sortOrder === "desc") {
        result = -result;
      }
      return result;
    },
  };

  const filter = (project: ProjectData): boolean => {
    let butSkillsResult: boolean = butSkillFilter.length === 0;
    for (const filter of butSkillFilter) {
      if (project.butSkillsIds.includes(parseInt(filter.value))) {
        butSkillsResult = true;
      }
    }
    let toolsResult: boolean = toolsFilter.length === 0;
    for (const filter of toolsFilter) {
      if (project.toolsIds.includes(filter.value)) {
        toolsResult = true;
      }
    }
    let typeResult: boolean = projectTypeFilter.length === 0;
    for (const filter of projectTypeFilter) {
      if (project.type[lang] === filter.value) {
        typeResult = true;
      }
    }
    return butSkillsResult && toolsResult && typeResult;
  };

  const getProjectTypeOptions = (): SelectOption[] => {
    if (!projectsData?.projects) {
      return [];
    }
    const options: SelectOption[] = [];
    for (const project of projectsData.projects) {
      if (
        !options.find(
          (option: SelectOption) => option.value === project.type[lang]
        )
      ) {
        options.push({ value: project.type[lang], label: project.type[lang] });
      }
    }
    return options;
  };

  useEffect(() => {
    setButSkillFilter([]);
    setToolsFilter([]);
    setProjectTypeFilter([]);
  }, [lang]);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("projects")) as ProjectsData | false;
      if (!response) {
        return;
      }
      setProjectsData(response);
    })();
  }, []);

  const sortByOptions: SelectOption[] = [
    { value: "end-date", label: t("endDate") },
    { value: "name", label: t("name") },
  ];

  const orderByOptions: SelectOption[] = [
    { value: "asc", label: t("asc") },
    { value: "desc", label: t("desc") },
  ];

  return (
    <section id="projects">
      <h2>{t("myProjects")}</h2>
      <div className="filter-and-sort-container">
        <div className="filters">
          <div className="input-container">
            <span>{t("skillFilter")}</span>
            <MultiSelect
              options={props.allButSkills.map(
                (skill: ButSkill): SelectOption => {
                  return {
                    value: skill.id.toString(),
                    label: skill.shortName[lang],
                  };
                }
              )}
              selectedOptions={butSkillFilter}
              onChange={(option: SelectOption) => {
                if (
                  butSkillFilter.find(
                    (o: SelectOption) => o.value === option.value
                  )
                ) {
                  setButSkillFilter(
                    butSkillFilter.filter(
                      (o: SelectOption) => o.value !== option.value
                    )
                  );
                } else {
                  setButSkillFilter([...butSkillFilter, option]);
                }
              }}
            />
          </div>
          <div className="input-container">
            <span>{t("toolFilter")}</span>
            <MultiSelect
              options={props.allTools.map((tool: Tool): SelectOption => {
                return {
                  value: tool.id,
                  label: tool.name,
                  iconUrl: getIconUrlForTheme(tool.logo, resolvedTheme),
                };
              })}
              selectedOptions={toolsFilter}
              onChange={(option: SelectOption) => {
                if (
                  toolsFilter.find(
                    (o: SelectOption) => o.value === option.value
                  )
                ) {
                  setToolsFilter(
                    toolsFilter.filter(
                      (o: SelectOption) => o.value !== option.value
                    )
                  );
                } else {
                  setToolsFilter([...toolsFilter, option]);
                }
              }}
            />
          </div>
          <div className="input-container">
            <span>{t("typeFilter")}</span>
            <MultiSelect
              options={getProjectTypeOptions()}
              selectedOptions={projectTypeFilter}
              onChange={(option: SelectOption) => {
                if (
                  projectTypeFilter.find(
                    (o: SelectOption) => o.value === option.value
                  )
                ) {
                  setProjectTypeFilter(
                    projectTypeFilter.filter(
                      (o: SelectOption) => o.value !== option.value
                    )
                  );
                } else {
                  setProjectTypeFilter([...projectTypeFilter, option]);
                }
              }}
            />
          </div>
        </div>
        <div className="input-container">
          <span>{t("sortBy")}</span>
          <Select
            options={sortByOptions}
            selectedOption={
              sortByOptions.find(
                (option: SelectOption) => option.value === sortBy
              ) as SelectOption
            }
            onChange={(option: SelectOption) => {
              setSortBy(option.value as SortByType);
            }}
          />
          <Select
            options={orderByOptions}
            selectedOption={
              orderByOptions.find(
                (option: SelectOption) => option.value === sortOrder
              ) as SelectOption
            }
            onChange={(option: SelectOption) => {
              setSortOrder(option.value as SortOrderType);
            }}
          />
        </div>
      </div>
      <div className="project-list">
        {projectsData &&
          projectsData.projects
            .filter(filter)
            .sort(sortFns[sortBy])
            .map((project: ProjectData, i: number) => (
              <Project
                data={project}
                key={`project-${i}`}
                position={i}
                allTools={props.allTools}
                isToolsLoading={props.isToolsLoading}
                allButSkills={props.allButSkills}
                isButSkillsLoading={props.isButSkillsLoading}
                setImagesToView={props.setImagesToView}
              />
            ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
