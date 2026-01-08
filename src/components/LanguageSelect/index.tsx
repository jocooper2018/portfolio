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
