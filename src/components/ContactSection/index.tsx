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
      <h2>{t("contactMe")}</h2>
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
