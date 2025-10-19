import "./index.css";
import { useContext } from "react";
import { ThemeContext, type PreferredTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Select, { type SelectOption } from "../Select";

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useLanguage();

  const options: SelectOption[] = [
    { value: "system", label: t("systemTheme") },
    { value: "light", label: t("lightTheme") },
    { value: "dark", label: t("darkTheme") },
  ];

  const handleChange = (option: SelectOption) => {
    setTheme(option.value as PreferredTheme);
  };

  const getSelectedOptionFromTheme = (): SelectOption => {
    return options.find((o: SelectOption) => o.value === theme) ?? options[0];
  };

  return (
    <Select
      options={options}
      selectedOption={getSelectedOptionFromTheme()}
      onChange={handleChange}
      align="right"
    />
  );
};

export default ThemeSelect;
