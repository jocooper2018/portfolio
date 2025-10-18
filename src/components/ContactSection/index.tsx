import "./index.css";
import { useContext, useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ContactDatas from "../../interfaces/ContactDatas";
import type ContactInfos from "../../interfaces/ContactInfos";
import getIconUrlForTheme from "../../utils/getIconUrlForTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [contactDatas, setContactDatas] = useState<ContactDatas | undefined>(
    undefined
  );
  const { resolvedTheme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const response = (await getRessource("contact-infos")) as
        | ContactDatas
        | false;
      if (!response) {
        return;
      }
      setContactDatas(response);
    })();
  }, []);

  return (
    <section id="contact">
      <h2>{t("contact")}</h2>
      <address>
        {contactDatas &&
          contactDatas.contactInfos.map((contact: ContactInfos, i: number) => (
            <a href={contact.url} target="_blank" key={i} className="button">
              <img
                src={getIconUrlForTheme(contact.icon, resolvedTheme)}
                alt=""
              />
              <span>{contact.urlText}</span>
            </a>
          ))}
      </address>
    </section>
  );
};

export default ContactSection;
