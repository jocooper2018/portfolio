import "./index.css";
import LanguageSelect from "../LanguageSelect";
import ThemeSelect from "../ThemeSelect";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import BurgerIcon from "../../assets/icons/BurgerIcon";

interface HeaderProps {
  readonly showBurger: boolean;
  readonly setIsBurgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { t } = useLanguage();

  const [isHeaderDown, setIsHeaderDown] = useState<boolean>(true);

  useEffect(() => {
    let previousScrollPos = 0;
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > previousScrollPos) {
        setIsHeaderDown(false);
      } else {
        setIsHeaderDown(true);
      }
      previousScrollPos = currentScrollPos;
    });
  }, []);

  return (
    <header
      style={{ transform: `translateY(${isHeaderDown ? "0" : "-150%"})` }}
    >
      <a href="/">Portfolio</a>
      {props.showBurger ? (
        <button
          type="button"
          className="burger-button"
          onClick={() => {
            props.setIsBurgerMenuOpen(true);
          }}
        >
          <BurgerIcon />
        </button>
      ) : (
        <>
          <div>
            <a href="#home">{t("home")}</a>
            <a href="#about-me">{t("aboutMe")}</a>
            <a href="#projects">{t("projects")}</a>
            <a href="#skills">{t("skills")}</a>
            <a href="#trainings">{t("trainings")}</a>
            <a href="#work-experiences">{t("workExperiences")}</a>
            <a href="#contact">{t("contact")}</a>
          </div>
          <div>
            <LanguageSelect />
            <ThemeSelect />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
