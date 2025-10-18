import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ProjectsData from "../../interfaces/ProjectsData";
import type ProjectData from "../../interfaces/Project";
import Project from "./Project";

const ProjectsSection: React.FC = () => {
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
          <Project data={project} key={`project-${i}`} position={i} />
        ))}
    </section>
  );
};

export default ProjectsSection;
