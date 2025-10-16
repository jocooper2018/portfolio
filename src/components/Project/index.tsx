import "./index.css";
import type ProjectData from "../../interfaces/Project";
import type ButSkill from "../../interfaces/ButSkill";
import { useLanguage } from "../../contexts/LanguageContext";
import type Tool from "../../interfaces/Tool";
import { formatDateOption } from "../../consts";

interface ProjectProps {
  readonly data: ProjectData;
  readonly position: number;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  const { t, lang } = useLanguage();

  const startDate: string = new Date(props.data.startDate).toLocaleDateString(
    undefined,
    formatDateOption
  );
  const endDate: string = props.data.endDate
    ? new Date(props.data.endDate).toLocaleDateString(
        undefined,
        formatDateOption
      )
    : t("today");

  return (
    <article className={`project${props.position % 2 !== 0 ? " reverse" : ""}`}>
      <div className="card">
        <div className="header">
          <h3>{props.data.name}</h3>
          <div>
            {startDate}
            {endDate !== startDate && ` - ${endDate}`}
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
            <li key={`tool-${i}`}>{tool.name}</li>
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
