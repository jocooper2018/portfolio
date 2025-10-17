import "./index.css";
import { formatDateOption } from "../../consts";
import { useLanguage } from "../../contexts/LanguageContext";
import type TrainingData from "../../interfaces/Training";
import OpenInNewIcon from "../../assets/icons/OpenInNew";

interface TrainingProps {
  readonly data: TrainingData;
}

const Training: React.FC<TrainingProps> = (props: TrainingProps) => {
  const { t, lang } = useLanguage();

  const startDate: string = new Date(props.data.startDate).toLocaleDateString(
    lang,
    formatDateOption
  );
  const endDate: string = props.data.endDate
    ? new Date(props.data.endDate).toLocaleDateString(lang, formatDateOption)
    : t("today");

  return (
    <article className="training card">
      <div className="line">
        <div>{props.data.schoolName[lang]}</div>
        <div>
          {startDate}
          {startDate !== endDate && ` - ${endDate}`}
        </div>
      </div>
      <div className="line">
        <h3>{props.data.certificateName[lang]}</h3>
        <div>{props.data.specialty[lang]}</div>
      </div>
      <p>{props.data.description[lang]}</p>
      <a href={props.data.url[lang]} target="_blank" className="button">
        {t("webSite")}
        <OpenInNewIcon /> 
      </a>
    </article>
  );
};

export default Training;
