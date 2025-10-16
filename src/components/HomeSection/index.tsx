import "./index.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import type PersonalInfosData from "../../interfaces/PersonalInfosData";
import getRessource from "../../utils/getRessource";

const HomeSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [personalInfosData, setPersonalInfoData] = useState<
    PersonalInfosData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("personal-infos")) as
        | PersonalInfosData
        | false;
      if (!response) {
        return;
      }
      setPersonalInfoData(response);
    })();
  }, []);

  return (
    <section id="home">
      {personalInfosData && (
        <div className="content">
          <span>{t("hello")}</span>
          <h1>
            {personalInfosData.personalInfos.firstName}{" "}
            {personalInfosData.personalInfos.name}
          </h1>
          <span className="status">{personalInfosData.personalInfos.status[lang]}</span>
          <p>{personalInfosData.personalInfos.pitch[lang]}</p>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
