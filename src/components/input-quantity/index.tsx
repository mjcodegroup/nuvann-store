import React from 'react';
import Styles from './input-quantity.module.scss';
import { useTranslation } from 'react-i18next';

interface InputQuantityProps {
  label: string;
  type?: string;
  name?: string;
  value?: number;
  availableText?: string;
  decrement: () => void;
  increment: () => void;
  onChange?: (value: number) => void;
  total?: number;
  minLength?: number;
  disabled?: boolean;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
  label,
  availableText,
  name,
  decrement,
  value = 1,
  increment,
  total,
  minLength = 1,
  disabled = false,
}) => {
  const { t } = useTranslation('details');
  const isDecrementDisabled = value <= minLength || disabled;
  const isIncrementDisabled = total ? value >= total || disabled : disabled;

  return (
    <section className={Styles.input_quantity_container}>
      <span className={Styles.label_}>{label}:</span>
      <form className={Styles.count_inlineflex}>
        <div
          className={`${Styles._qty_min} ${isDecrementDisabled ? Styles.disabled : ''}`}
          onClick={!isDecrementDisabled ? decrement : undefined}
        >
          -
        </div>
        <input
          disabled
          type="text"
          name={name}
          value={value}
          className={Styles._qty}
          minLength={minLength}
        />
        <div
          className={`${Styles._qty_max} ${isIncrementDisabled ? Styles.disabled : ''}`}
          onClick={!isIncrementDisabled ? increment : undefined}
        >
          +
        </div>
      </form>
      {total ? (
        <span className={Styles._label}>
          {total} {total > 0 ? availableText: ''}
        </span>
      ) : (
        <span style={{color: 'red'}}> 
          {total && t("unavailable")}
        </span>
      )}
    </section>
  );
};

export default InputQuantity;
