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

const SkillsSection: React.FC<SkillsSectionProps> = (
  props: SkillsSectionProps
) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);
  const [skillsData, setSkillsData] = useState<SkillsData | undefined>(
    undefined
  );
  const [skillSelected, setSkillSelected] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("skills")) as SkillsData | false;
      if (!response) {
        return;
      }
      setSkillsData(response);
    })();
  }, []);

  return (
    <section id="skills">
      <h2>{t("skills")}</h2>
      {skillsData && (
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
                        <span>{tool.name}</span>
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
