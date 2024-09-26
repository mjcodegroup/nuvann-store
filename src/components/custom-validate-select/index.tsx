import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Styles from "./custom-select.module.scss";
import { UseFormRegister } from "react-hook-form";

type Option = {
  value: any;
  label: string;
};

type SelectProps = {
  options: Option[];
  title?: string;
  onSelect: (value: Option) => void;
  register?: UseFormRegister<any>;
  name: string;
  error?: string;
};

const CustomValidateSelect: React.FC<SelectProps> = ({ options, onSelect, title, register, name, error }) => {
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

  useEffect(() => {
    if (selectedOption) {
      onSelect(selectedOption);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <div className={`${Styles.custom_select} ${isOpen ? Styles.open : ""}`}>
      <p>{title} <span>*</span></p>
      <div className={Styles.select_header} onClick={toggleSelect}>
        <span className={Styles.selected_option}>
          {selectedOption ? selectedOption.label : t("placeholders.custom_select_placeholder")}
        </span>
        <BiChevronDown className={`${Styles.toggle_icon} ${isOpen ? Styles.rotated : ""}`} />
      </div>
      {isOpen && (
        <ul className={Styles.options_list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={Styles.option}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={Styles.error_message}>{error}</span>}
    </div>
  );
};

export default CustomValidateSelect;
