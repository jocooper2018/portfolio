import "./index.css";
import type ProjectData from "../../interfaces/Project";
import type ButSkill from "../../interfaces/ButSkill";
import { useLanguage } from "../../contexts/LanguageContext";
import type Tool from "../../interfaces/Tool";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import getLogoForTheme from "../../utils/getLogoForTheme";
import DateRange from "../DateRange";

interface ProjectProps {
  readonly data: ProjectData;
  readonly position: number;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  const { lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  return (
    <article className={`project${props.position % 2 !== 0 ? " reverse" : ""}`}>
      <div className="card">
        <div className="header">
          <h3>{props.data.name}</h3>
          <div>
            <DateRange
              startDate={props.data.startDate}
              endDate={props.data.endDate}
            />
          </div>
        </div>
        <ul className="but-skills">
          {props.data.butSkills.map((butSkill: ButSkill, i: number) => (
            <li key={`but-skill-${i}`}>{butSkill.shortName[lang]}</li>
          ))}
        </ul>
        <p>{props.data.description[lang]}</p>
        <ul className="tools">
          {props.data.tools.map((tool: Tool, i: number) => (
            <li key={`tool-${i}`}>
              <img src={getLogoForTheme(tool, resolvedTheme)} alt={tool.name} />
            </li>
          ))}
        </ul>
      </div>
      <img
        src={props.data.images[0].url}
        alt={props.data.images[0].alt[lang]}
      />
    </article>
  );
};

export default Project;
