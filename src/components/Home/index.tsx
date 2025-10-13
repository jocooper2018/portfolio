import "./index.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import type PersonalInfos from "../../interfaces/PersonalInfos";
import getRessource from "../../utils/getRessource";

const Home: React.FC = () => {
  const { t, lang } = useLanguage();
  const [personalInfos, setPersonalInfo] = useState<PersonalInfos | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = (await getRessource("personal-infos", lang)) as
        | PersonalInfos
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
            {personalInfos.firstName} {personalInfos.name}
          </h1>
          <span>{personalInfos.status}</span>
          <p>{personalInfos.pitch}</p>
        </div>
      )}
    </section>
  );
};

export default Home;
