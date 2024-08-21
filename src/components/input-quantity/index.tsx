import React from 'react'
import Styles from './input-quantity.module.scss';

interface InputQuantityProps {
    label: string;
    type?: string;
    name?: string;
    value?: number;
    decrement: () => void;
    increment: () => void;
    onChange?: (value: number) => void;
    total?:number;
    minLength?: number;
}

const InputQuantity: React.FC<InputQuantityProps> =({
    label,
    name,
    decrement,
    value,
    increment,
    total,
    minLength = 1
}) =>{

  return (
    <section className={Styles.input_quantity_container}>
        <span className={Styles._label}> {label}: </span>
        <form className={Styles.count_inlineflex}>
            <div className={Styles._qty_min} onClick={decrement}>-</div>
                <input disabled type="text" name={name} value={value}  className={Styles._qty} minLength={minLength}/>
            <div className={Styles._qty_max} onClick={increment}>+</div>
        </form>
        {total ? 
        <span className={Styles._label}> {total} disponib </span>
        :''}
    </section>
  )
}

export default InputQuantity;