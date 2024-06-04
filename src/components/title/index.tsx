import React from "react";

import Styles from './title.module.scss'

interface TitleProps {
    title: string;
    className?: string;
}

const Title: React.FC<TitleProps> =({title, className}) =>{
    return (
        <div className={Styles.section_title}>
            <h4 className={className}>{title}</h4>
        <div></div>
        </div>
    )
}

export default Title;