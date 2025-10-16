import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type WorkExperienceData from "../../interfaces/WorkExperiencesData";
import type WorkExperience from "../../interfaces/WorkExperience";

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
      <ul>
        {workExperiencesData &&
          workExperiencesData.workExperiences.map(
            (workExperience: WorkExperience, i: number) => (
              <li key={`work-experience-${i}`}>
                <h3>{workExperience.companyName}</h3>
                <div>{workExperience.post[lang]}</div>
                <div>{workExperience.type[lang]}</div>
                <div>{workExperience.location[lang]}</div>
              </li>
            )
          )}
      </ul>
    </section>
  );
};

export default WorkExperiencesSection;
