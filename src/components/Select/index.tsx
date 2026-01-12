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
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "../../assets/icons/KeyboardArrowDownIcon";
import KeyboardArrowUpIcon from "../../assets/icons/KeyboardArrowUpIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly iconUrl?: string;
  readonly title?: string;
}

interface SelectProps {
  readonly options: SelectOption[];
  readonly selectedOption: SelectOption;
  readonly onChange: (option: SelectOption) => void;
  readonly align?: "left" | "right";
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenuOverflowingBottom, setIsMenuOverflowingBottom] =
    useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const selectMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!selectMenuRef.current) {
      return;
    }
    const rect: DOMRect = selectMenuRef.current.getBoundingClientRect();
    const viewportHeight: number = window.innerHeight;
    setIsMenuOverflowingBottom(rect.bottom > viewportHeight);
  }, [isOpen]);

  return (
    <div ref={selectRef} className="select">
      <button
        type="button"
        className="select-input"
        onClick={() => {
          if (isOpen) handleClose();
          else handleOpen();
        }}
      >
        <span>{props.selectedOption.label}</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      {isOpen && (
        <div
          className={`select-menu${props.align ? ` align-${props.align}` : ""}${
            isMenuOverflowingBottom ? " overflowing-bottom" : ""
          }`}
          ref={selectMenuRef}
        >
          {props.options.map((option: SelectOption) => (
            <button
              type="button"
              className={`${
                props.selectedOption.value === option.value ? "selected" : ""
              }`}
              key={option.value}
              onClick={() => {
                props.onChange(option);
                handleClose();
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

export default Select;
