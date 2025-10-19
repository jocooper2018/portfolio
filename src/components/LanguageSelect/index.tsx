import "./index.css";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../types/Language";
import type { SelectOption } from "../Select";
import Select from "../Select";

const LanguageSelect: React.FC = () => {
  const { lang, setLang } = useLanguage();

  const options: SelectOption[] = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
  ];

  const handleChange = (option: SelectOption) => {
    setLang(option.value as Language);
  };

  const getSelectedOptionFromLang = (): SelectOption => {
    return options.find((o: SelectOption) => o.value === lang) ?? options[0];
  };

  return (
    <Select
      options={options}
      selectedOption={getSelectedOptionFromLang()}
      onChange={handleChange}
    />
  );
};

export default LanguageSelect;
