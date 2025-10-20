import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ProjectsData from "../../interfaces/ProjectsData";
import type ProjectData from "../../interfaces/Project";
import Project from "./Project";
import type Tool from "../../interfaces/Tool";
import type ButSkill from "../../interfaces/ButSkill";
import Select, { type SelectOption } from "../Select";

interface ProjectsSectionProps {
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
  readonly allButSkills: ButSkill[];
  readonly isButSkillsLoading: boolean;
}

type SortByType = "end-date" | "name";
type SortOrderType = "asc" | "desc";

const ProjectsSection: React.FC<ProjectsSectionProps> = (
  props: ProjectsSectionProps
) => {
  const { t, lang } = useLanguage();
  const [projectsData, setProjectsData] = useState<ProjectsData | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState<SortByType>("end-date");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");

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
      <h2>{t("projects")}</h2>
      <div id="sort-project-section">
        <div>
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
      {projectsData &&
        projectsData.projects
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
            />
          ))}
    </section>
  );
};

export default ProjectsSection;
