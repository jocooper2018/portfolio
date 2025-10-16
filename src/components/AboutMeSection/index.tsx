import "./index.css";
import { useEffect, useState } from "react";
import type AboutMeData from "../../interfaces/AboutMeData";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type { TranslatedString } from "../../types/Language";

const AboutMeSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [aboutMeData, setAboutMeData] = useState<AboutMeData | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const response = await getRessource("about-me");
      if (!response) {
        return;
      }
      setAboutMeData(response);
    })();
  }, []);

  return (
    <section id="about-me">
      <h2>{t("aboutMe")}</h2>
      {aboutMeData && (
        <div>
          <div>
            {aboutMeData.aboutMe.paragraphs.map(
              (p: TranslatedString, i: number) => (
                <p key={`p-${i}`}>{p[lang]}</p>
              )
            )}
          </div>
          <img
            src={`${import.meta.env.BASE_URL}${aboutMeData.aboutMe.photo.url}`}
            alt={aboutMeData.aboutMe.photo.alt[lang]}
          />
        </div>
      )}
    </section>
  );
};

export default AboutMeSection;
