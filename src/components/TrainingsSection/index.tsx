import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type TrainingsData from "../../interfaces/TrainingsData";
import type Training from "../../interfaces/Training";

const TrainingsSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [trainingsData, setTrainingsData] = useState<TrainingsData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = await getRessource("trainings", lang);
      if (!response) {
        return;
      }
      setTrainingsData(response);
    })();
  }, [lang]);

  return (
    <section id="trainings">
      <h2>{t("trainings")}</h2>
      <ul>
        {trainingsData &&
          trainingsData.trainings.map((training: Training) => (
            <li>
              <h3>{training.certificateName}</h3>
              <div>{training.specialty}</div>
              <div>{training.schoolName}</div>
              <p>{training.description}</p>
              <a href={training.url} target="_blank">{t("webSite")}</a>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TrainingsSection;
