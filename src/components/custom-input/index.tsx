import React, { useState } from "react";
import Styles from "./custom-input.module.scss"

interface BaseInputProps {
    type: string;
    placeholder?:string;
    label?: string;
    required?: boolean;
    value?: string | number;
    onChange: (value: string | number ) => void;
    min?:string;
    max?:string;
}


const CustomInput: React.FC<BaseInputProps> =({type, onChange, placeholder, label, required, value, min, max}) =>{
    const [inputValue, setInputValue] = useState<string | number>(value || "");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: any = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };
    return (
        <div className={Styles.custom_input}>
            <label>{label} <span>*</span></label>
            <input
             type={type}
             required={required}
             onChange={handleInputChange}
             value={value}
             placeholder={placeholder}
             min={min}
             max={max}
            />
        </div>
    )
}

export default CustomInput;