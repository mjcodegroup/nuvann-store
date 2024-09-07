import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import Title from '../title';
import CustomButton from '../custom-buttom';

interface CartResumeProps {
  count: number;
  cartTotal?: number;
  shipTotal: number;
  productSubtotal: number;
  OnclickContinue: () => void;
}

const CartResume: React.FC<CartResumeProps> = ({ count, cartTotal = 0, shipTotal = 0, productSubtotal = 0, OnclickContinue }) => {
  return (
    <div className={styles.card_resume}>
      <Title title='Rezime' className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>Total Pwodui ({count})</p>
          <h5>{productSubtotal}</h5>
        </div>
        <hr />

        <div className={styles.resume_separated_info}>
          <p>Livrezon</p>
          <h5>{shipTotal}</h5>
        </div>
        <hr />

        <div className={styles.resume_separated_info}>
          <p>Total </p>
          <h5>{cartTotal}</h5>
        </div>
        <hr />
      </div>

      <div className={styles.resume_buttons}>
        <CustomButton backgroundColor ='#00C02A' textColor="#fff" onClick={() => alert('Button clicked!')}>
          <Link href="/checkout/userinfos">Kontinye</Link>
        </CustomButton>
        <CustomButton backgroundColor ='#001A5C' textColor="#fff" onClick={() => alert('Button clicked!')}>
            Kontinye Achte
        </CustomButton>
      </div>
    </div>
  );
}

export default CartResume;
