import "./index.css";
import { useRef, useState } from "react";
import KeyboardArrowDownIcon from "../../assets/icons/KeyboardArrowDownIcon";
import KeyboardArrowUpIcon from "../../assets/icons/KeyboardArrowUpIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly iconUrl?: string;
}

interface SelectProps {
  readonly options: SelectOption[];
  readonly selectedOption: SelectOption;
  readonly onChange: (option: SelectOption) => void;
  readonly align?: "left" | "right";
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
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
          className={`select-menu${props.align ? ` align-${props.align}` : ""}`}
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
