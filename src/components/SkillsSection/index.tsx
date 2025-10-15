import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type SkillsData from "../../interfaces/SkillsData";
import type Skill from "../../interfaces/Skill";
import type Tool from "../../interfaces/Tool";

const SkillsSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [skillsData, setSkillsData] = useState<SkillsData | undefined>(
    undefined
  );

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
      <ul>
        {skillsData &&
          skillsData.skills.map((skill: Skill) => (
            <li>
              <h3>{skill.name[lang]}</h3>
              <ul>
                {skill.tools.map((tool: Tool) => (
                  <li>{tool.name}</li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SkillsSection;
