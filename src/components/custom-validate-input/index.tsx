import React, { forwardRef } from "react";
import Styles from "./custom-validate-input.module.scss";

interface BaseInputProps {
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  value?: string | number;
  error?: string; // Para exibir erros de validação
  [x: string | number]: any; // Permite passar propriedades extras
}
// eslint-disable-next-line react/display-name
const CustomValidateInput = forwardRef<HTMLInputElement, BaseInputProps>(({
  type,
  placeholder,
  label,
  required,
  value,
  error,
  ...rest // Captura todas as outras propriedades, incluindo onChange
}, ref) => {
  return (
    <div className={Styles.custom_input}>
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        ref={ref} // Atribui o ref ao input
        {...rest} // Espalha as propriedades extras, que incluem onChange do react-hook-form
      />
      {error && <span className={Styles.error}>{error}</span>} {/* Exibe erros de validação */}
    </div>
  );
});

export default CustomValidateInput;
