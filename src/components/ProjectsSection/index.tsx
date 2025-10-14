import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ProjectsData from "../../interfaces/ProjectsData";

const ProjectsSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [projectsData, setProjectsData] = useState<ProjectsData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = await getRessource("projects", lang);
      if (!response) {
        return;
      }
      setProjectsData(response);
    })();
  }, [lang]);

  return (
    <section id="#projects">
      <h2>{t("projects")}</h2>
      <ul>
        {projectsData &&
          projectsData.data.map((project) => (
            <li>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.tools.map((tool) => (
                  <li>{tool.name}</li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
