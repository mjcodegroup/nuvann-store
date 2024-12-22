import React from 'react';
import Styles from './profileSkeleton.module.scss';

export  default function ProfileCardSkeleton() {
    return (
        <div className={Styles.profileSkeleton}>
            <div className={Styles.avatarSection}>
                <div className={Styles.avatarContainer}></div>
                <h2 className={Styles.skeletonText}></h2>
                <div className={Styles.userDetails}>
                    {Array(5).fill(0).map((_, index) => (
                        <div className={Styles.detailRow} key={index}>
                            <span className={Styles.skeletonLabel}></span>
                            <span className={Styles.skeletonValue}></span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={Styles.infoSection}>
                <h2 className={Styles.skeletonText}></h2>
                {Array(7).fill(0).map((_, index) => (
                    <div className={Styles.inputRow} key={index}>
                        <label className={Styles.skeletonLabel}></label>
                        <div className={Styles.skeletonInput}></div>
                    </div>
                ))}
                <div className={Styles.saveButtonContainer}>
                    <div className={Styles.skeletonButton}></div>
                </div>
            </div>
        </div>
    );
}
