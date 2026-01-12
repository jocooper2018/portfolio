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
import { useRef, useState } from "react";
import KeyboardArrowDownIcon from "../../assets/icons/KeyboardArrowDownIcon";
import KeyboardArrowUpIcon from "../../assets/icons/KeyboardArrowUpIcon";
import type { SelectOption } from "../Select";
import CheckIcon from "../../assets/icons/CheckIcon";
import { useLanguage } from "../../contexts/LanguageContext";

// TODO Merge MultiSelect into Select

interface MultiSelectProps {
  readonly options: SelectOption[];
  readonly selectedOptions: SelectOption[];
  readonly onChange: (option: SelectOption) => void;
  readonly align?: "left" | "right";
}

const MultiSelect: React.FC<MultiSelectProps> = (props: MultiSelectProps) => {
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    window.addEventListener("click", handleClickOutside);
  };

  const handleClose = () => {
    setIsOpen(false);
    window.removeEventListener("click", handleClickOutside);
  };

  return (
    <div ref={selectRef} className="select multi-select">
      <button
        type="button"
        className="select-input"
        onClick={() => {
          if (isOpen) handleClose();
          else handleOpen();
        }}
      >
        <span>
          {props.selectedOptions.length === 0
            ? t("noSelection")
            : props.selectedOptions.length === props.options.length
            ? t("all")
            : props.selectedOptions.length === 1
            ? props.selectedOptions[0].label
            : `${props.selectedOptions.length} ${t("selections")}`}
        </span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      {isOpen && (
        <div
          className={`select-menu${props.align ? ` align-${props.align}` : ""}`}
        >
          {props.options.map((option: SelectOption) => (
            <button
              type="button"
              className={`${
                props.selectedOptions.find(
                  (o: SelectOption) => o.value === option.value
                ) !== undefined
                  ? "selected"
                  : ""
              }`}
              key={option.value}
              onClick={() => {
                props.onChange(option);
              }}
              title={option.title}
            >
              <CheckIcon />
              {option.iconUrl && <img src={option.iconUrl} alt="" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
