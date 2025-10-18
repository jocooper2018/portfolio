import "./index.css";
import { useLanguage } from "../../../contexts/LanguageContext";
import type TrainingData from "../../../interfaces/Training";
import OpenInNewIcon from "../../../assets/icons/OpenInNewIcon";
import DateRange from "../../DateRange";

interface TrainingProps {
  readonly data: TrainingData;
}

const Training: React.FC<TrainingProps> = (props: TrainingProps) => {
  const { t, lang } = useLanguage();

  return (
    <article className="training card">
      <div className="line">
        <div>{props.data.schoolName[lang]}</div>
        <div>
          <DateRange
            startDate={props.data.startDate}
            endDate={props.data.endDate}
          />
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
