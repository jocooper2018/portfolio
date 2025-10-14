import "./index.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import type PersonalInfosData from "../../interfaces/PersonalInfosData";
import getRessource from "../../utils/getRessource";

const HomeSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [personalInfos, setPersonalInfo] = useState<PersonalInfosData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("personal-infos", lang)) as
        | PersonalInfosData
        | false;
      if (!response) {
        return;
      }
      setPersonalInfo(response);
    })();
  }, [lang]);

  return (
    <section id="home">
      {personalInfos && (
        <div className="content">
          <span>{t("hello")}</span>
          <h1>
            {personalInfos.data.firstName} {personalInfos.data.name}
          </h1>
          <span>{personalInfos.data.status}</span>
          <p>{personalInfos.data.pitch}</p>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
