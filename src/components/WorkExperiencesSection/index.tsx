import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type WorkExperienceData from "../../interfaces/WorkExperiencesData";
import type WorkExperience from "../../interfaces/WorkExperience";
import DateRange from "../DateRange";

const WorkExperiencesSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [workExperiencesData, setWorkExperiencesData] = useState<
    WorkExperienceData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("work-experiences")) as
        | WorkExperienceData
        | false;
      if (!response) {
        return;
      }
      setWorkExperiencesData(response);
    })();
  }, []);

  return (
    <section id="work-experiences">
      <h2>{t("workExperiences")}</h2>
      {workExperiencesData &&
        workExperiencesData.workExperiences.map(
          (workExperience: WorkExperience, i: number) => (
            <article
              key={`work-experience-${i}`}
              className="work-experience card"
            >
              <div className="line">
                <h3>{workExperience.post[lang]}</h3>
                <div>
                  <DateRange
                    startDate={workExperience.startDate}
                    endDate={workExperience.endDate}
                  />
                </div>
              </div>
              <div className="line">
                <div>{workExperience.companyName}</div>
                <div>{workExperience.type[lang]}</div>
              </div>
              <div>{workExperience.location[lang]}</div>
              <p>{workExperience.description[lang]}</p>
            </article>
          )
        )}
    </section>
  );
};

export default WorkExperiencesSection;
