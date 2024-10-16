import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Styles from "./custom-select.module.scss";

type Option = {
  code: any;
  name: string;
};

type SelectProps = {
  options: Option[];
  title?: string
  onSelect: (value: Option) => void;
};

const CustomSelect: React.FC<SelectProps> = ({ options, onSelect, title }) => {
    const { t } = useTranslation("placeholders");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

  return (
    <div className={`${Styles.custom_select} ${isOpen ? Styles.open : ""}`}>
        <p>{title} <span>*</span></p>
      <div className={Styles.select_header} onClick={toggleSelect}>
        <span className={Styles.selected_option}>
          {selectedOption ? selectedOption.name : t("custom_select_placeholder")}
        </span>
        <BiChevronDown className={`${Styles.toggle_icon} ${isOpen ? Styles.rotated : ""}`} />
      </div>
      {isOpen && (
        <ul className={Styles.options_list}>
          {options?.map((option) => (
            <li
              key={option.code}
              className={Styles.option}
              onClick={() => handleOptionSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;