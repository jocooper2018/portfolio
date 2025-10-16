import "./index.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import getRessource from "../../utils/getRessource";
import type ContactDatas from "../../interfaces/ContactDatas";
import type ContactInfos from "../../interfaces/ContactInfos";

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [contactDatas, setContactDatas] = useState<ContactDatas | undefined>(
    undefined
  );

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
            <div key={`contact-info-${i}`}>
              {contact.name}:{" "}
              <a href={contact.url} target="_blank">
                {contact.urlText}
              </a>
            </div>
          ))}
      </address>
    </section>
  );
};

export default ContactSection;
