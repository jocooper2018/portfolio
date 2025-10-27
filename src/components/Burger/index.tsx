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
      </div>
      <div>
        <LanguageSelect />
        <ThemeSelect />
      </div>
    </div>
  );
};

export default Burger;
