import "./index.css";
import { useContext } from "react";
import { ThemeContext, type PreferredTheme } from "../../contexts/ThemeContext";

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as PreferredTheme;
    setTheme(selected);
  };

  return (
    <select value={theme} onChange={handleChange}>
      <option value="system">Thème de l'appareil</option>
      <option value="light">Thème clair</option>
      <option value="dark">Thème sombre</option>
    </select>
  );
};

export default ThemeSelect;
