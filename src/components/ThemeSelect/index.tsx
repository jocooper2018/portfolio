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
