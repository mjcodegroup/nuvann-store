import React from 'react';
import styles from './ordersCardSkeleton.module.scss';

export default function OrdersCardSkeleton() {
    return (
        <div className={styles.skeletonHolder}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonList}>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <div className={styles.skeletonCard} key={index}>
                            <div className={styles.skeletonImage}></div>
                            <div className={styles.skeletonContent}>
                                <div className={styles.skeletonText}></div>
                                <div className={styles.skeletonText}></div>
                                <div className={styles.skeletonButton}></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
