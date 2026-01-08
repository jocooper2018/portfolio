/*
 *  A personal portfolio website to showcase projects.
 *  Copyright (C) 2026  Matthieu LE BOUT
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type TrainingsData from "../../interfaces/TrainingsData";
import type TrainingData from "../../interfaces/Training";
import Training from "./Training";

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
