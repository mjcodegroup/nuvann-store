import React from "react";
import styles from './style.module.scss';

interface TitleProps {
    title: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
    return (
        <div className={styles.sectionTitle}>
            <h4 className={className}>{title}</h4>
        </div>
    );
}

export default Title;
