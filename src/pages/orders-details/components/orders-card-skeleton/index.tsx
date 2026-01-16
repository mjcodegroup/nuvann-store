import React from 'react';
import styles from './orderDetailsSkeleton.module.scss';

export default function OrderDetailsSkeleton() {
    return (
        <div className={styles.skeletonHolder}>
            <div className={styles.skeletonPurchaseCards}>
                <div className={styles.skeletonHeader}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonButton}></div>
                </div>

                <div className={styles.skeletonAddress}></div>

                <div className={styles.skeletonScroll}>
                    {Array(3).fill(0).map((_, index) => (
                        <div key={index} className={styles.skeletonOrderSubCard}></div>
                    ))}
                </div>
            </div>

            <div className={styles.skeletonOrdersResume}>
                {Array(4).fill(0).map((_, index) => (
                    <div key={index} className={styles.skeletonResumeRow}></div>
                ))}

                <div className={styles.skeletonCheckoutButton}></div>
            </div>
        </div>
    );
}
