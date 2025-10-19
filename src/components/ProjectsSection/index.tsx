import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ProjectsData from "../../interfaces/ProjectsData";
import type ProjectData from "../../interfaces/Project";
import Project from "./Project";
import type Tool from "../../interfaces/Tool";

interface ProjectsSectionProps {
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = (
  props: ProjectsSectionProps
) => {
  const { t } = useLanguage();
  const [projectsData, setProjectsData] = useState<ProjectsData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("projects")) as ProjectsData | false;
      if (!response) {
        return;
      }
      setProjectsData(response);
    })();
  }, []);

  return (
    <section id="projects">
      <h2>{t("projects")}</h2>
      {projectsData &&
        projectsData.projects.map((project: ProjectData, i: number) => (
          <Project
            data={project}
            key={`project-${i}`}
            position={i}
            allTools={props.allTools}
            isToolsLoading={props.isToolsLoading}
          />
        ))}
    </section>
  );
};

export default ProjectsSection;
