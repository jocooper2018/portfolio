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
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSelect from "../LanguageSelect";
import ThemeSelect from "../ThemeSelect";
import CloseIcon from "../../assets/icons/CloseIcon";

interface BurgerProps {
  readonly isOpen: boolean;
  readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Burger: React.FC<BurgerProps> = (props: BurgerProps) => {
  const { t } = useLanguage();

  const handleClose = () => {
    props.setIsOpen(false);
  };

  return (
    <div
      className="burger card"
      style={{
        transform: `translateX(${props.isOpen ? "0" : "calc(100% + 2rem)"})`,
      }}
    >
      <button type="button" className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
      <div>
        <a href="#home" className="button" onClick={handleClose}>
          {t("home")}
        </a>
        <a href="#about-me" className="button" onClick={handleClose}>
          {t("aboutMe")}
        </a>
        <a href="#projects" className="button" onClick={handleClose}>
          {t("projects")}
        </a>
        <a href="#skills" className="button" onClick={handleClose}>
          {t("skills")}
        </a>
        <a href="#trainings" className="button" onClick={handleClose}>
          {t("trainings")}
        </a>
        <a href="#work-experiences" className="button" onClick={handleClose}>
          {t("workExperiences")}
        </a>
        <a href="#contact" className="button" onClick={handleClose}>
          {t("contact")}
        </a>
        <a
          href="/assets/documents/CV_2026-02-03_Matthieu_LE BOUT.pdf"
          className="button"
          target="_blank"
        >
          {t("cv")}
        </a>
      </div>
      <div>
        <LanguageSelect />
        <ThemeSelect />
      </div>
    </div>
  );
};

export default Burger;
