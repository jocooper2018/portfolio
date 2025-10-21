import "./index.css";
import type ProjectData from "../../../interfaces/Project";
import type ButSkill from "../../../interfaces/ButSkill";
import { useLanguage } from "../../../contexts/LanguageContext";
import type Tool from "../../../interfaces/Tool";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import getIconUrlForTheme from "../../../utils/getIconUrlForTheme";
import DateRange from "../../DateRange";
import getTool from "../../../utils/getTool";
import getButSkill from "../../../utils/getButSkill";
import PlayIcon from "../../../assets/icons/PlayIcon";

interface ProjectProps {
  readonly data: ProjectData;
  readonly position: number;
  readonly allTools: Tool[];
  readonly isToolsLoading: boolean;
  readonly allButSkills: ButSkill[];
  readonly isButSkillsLoading: boolean;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  return (
    <article className={`project${props.position % 2 !== 0 ? " reverse" : ""}`}>
      <div className="card">
        <div className="header">
          <div>
            <h3>{props.data.name[lang]}</h3>
            <span>{props.data.type[lang]}</span>
          </div>
          <div>
            <DateRange
              startDate={props.data.startDate}
              endDate={props.data.endDate}
            />
          </div>
        </div>
        <ul className="but-skills">
          {!props.isButSkillsLoading &&
            props.data.butSkillsIds.map((butSkillId: number, i: number) => (
              <li key={`but-skill-${i}`}>
                {getButSkill(props.allButSkills, butSkillId)?.shortName[lang]}
              </li>
            ))}
        </ul>
        <p>{props.data.description[lang]}</p>
        <ul className="tools">
          {props.data.toolsIds.map((toolId: string, i: number) => {
            if (props.isToolsLoading) {
              return <div className="loader" />;
            }
            const tool = getTool(props.allTools, toolId);
            if (!tool) {
              console.error(`tool ${toolId} not found`);
              return;
            }
            return (
              <li key={`tool-${i}`}>
                <a href={tool.url[lang]} target="_blank">
                  <img
                    src={getIconUrlForTheme(tool.logo, resolvedTheme)}
                    alt={tool.name}
                  />
                  <div className="popup">{tool.name}</div>
                </a>
              </li>
            );
          })}
        </ul>
        {(props.data.repositoryLink || props.data.testLink) && (
          <div className="links">
            {props.data.repositoryLink && (
              <a href={props.data.repositoryLink} target="_blank" className="repository-link">
                <img
                  src={getIconUrlForTheme(
                    (
                      props.allTools.find(
                        (tool: Tool) => tool.id === "github"
                      ) as Tool
                    ).logo,
                    resolvedTheme
                  )}
                  alt=""
                />
                <div className="popup">{t("seeSourceCode")}</div>
              </a>
            )}
            {props.data.testLink && (
              <a href={props.data.testLink} target="_blank" className="test-link">
                <PlayIcon />
                <div className="popup">{t("testProgram")}</div>
              </a>
            )}
          </div>
        )}
      </div>
      {props.data.images.length > 0 && (
        <img
          src={props.data.images[0].url}
          alt={props.data.images[0].alt[lang]}
        />
      )}
    </article>
  );
};

export default Project;
