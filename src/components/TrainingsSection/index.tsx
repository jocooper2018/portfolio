import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type TrainingsData from "../../interfaces/TrainingsData";
import type TrainingData from "../../interfaces/Training";
import Training from "../Training";

const TrainingsSection: React.FC = () => {
  const { t } = useLanguage();
  const [trainingsData, setTrainingsData] = useState<TrainingsData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("trainings")) as
        | TrainingsData
        | false;
      if (!response) {
        return;
      }
      setTrainingsData(response);
    })();
  }, []);

  return (
    <section id="trainings">
      <h2>{t("trainings")}</h2>
      {trainingsData &&
        trainingsData.trainings.map((training: TrainingData, i: number) => (
          <Training data={training} key={i} />
        ))}
    </section>
  );
};

export default TrainingsSection;
