import "./index.css";
import { useContext } from "react";
import { ThemeContext, type PreferredTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as PreferredTheme;
    setTheme(selected);
  };

  return (
    <select value={theme} onChange={handleChange}>
      <option value="system">{t("systemTheme")}</option>
      <option value="light">{t("lightTheme")}</option>
      <option value="dark">{t("darkTheme")}</option>
    </select>
  );
};

export default ThemeSelect;
