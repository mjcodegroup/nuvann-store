import React from 'react';
import styles from './style.module.scss'; // Assuming you rename it to use CSS Modules

interface InputQuantityProps {
    label: string;
    type?: string;
    name?: string;
    value?: number;
    decrement: () => void;
    increment: () => void;
    onChange?: (value: number) => void;
    total?: number;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
    label,
    name,
    decrement,
    value,
    increment,
    total,
}) => {
    return (
        <>
            <span className={styles.label}> {label}: </span>
            <form className={styles['count-inlineflex']}>
                <div className={styles['qty-min']} onClick={decrement}>-</div>
                <input
                    disabled
                    type="text"
                    name={name}
                    value={value}
                    className={styles.qty}
                    minLength={1}
                />
                <div className={styles['qty-max']} onClick={increment}>+</div>
            </form>
            {total ? <span className={styles.label}> {total} disponib </span> : ''}
        </>
    );
};

export default InputQuantity;
