import "./index.css";
import { useContext, useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type SkillsData from "../../interfaces/SkillsData";
import type Skill from "../../interfaces/Skill";
import type Tool from "../../interfaces/Tool";
import { ThemeContext } from "../../contexts/ThemeContext";
import getLogoForTheme from "../../utils/getLogoForTheme";

const SkillsSection: React.FC = () => {
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
              {skillsData.skills[skillSelected].tools.map(
                (tool: Tool, i: number) => (
                  <li key={i}>
                    <img
                      src={getLogoForTheme(tool, resolvedTheme)}
                      alt={`${tool.name} logo`}
                    />
                    <span>{tool.name}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
