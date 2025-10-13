import "./index.css";
import { useLanguage, type Language } from "../../contexts/LanguageContext";

const LanguageSelect: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        setLang(event.target.value as Language)
      }
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
};

export default LanguageSelect;
