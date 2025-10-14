import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ProjectsData from "../../interfaces/ProjectsData";
import type Project from "../../interfaces/Project";
import type Tool from "../../interfaces/Tool";
import type ButSkill from "../../interfaces/ButSkill";

const ProjectsSection: React.FC = () => {
  const { t, lang } = useLanguage();
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
  }, [lang]);

  return (
    <section id="projects">
      <h2>{t("projects")}</h2>
      <ul>
        {projectsData &&
          projectsData.projects.map((project: Project) => (
            <li>
              <h3>{project.name}</h3>
              <ul>
                {project.butSkills.map((butSkill: ButSkill) => (
                  <li>{butSkill.shortName[lang]}</li>
                ))}
              </ul>
              <p>{project.description[lang]}</p>
              <ul>
                {project.tools.map((tool: Tool) => (
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
