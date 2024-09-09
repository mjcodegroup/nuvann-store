import React from "react";

import Styles from './title.module.scss'

interface TitleProps {
    title: string;
    className?: string;
    centered?: boolean;
}

const Title: React.FC<TitleProps> =({title, className, centered=false}) =>{
    return (
        <div className={Styles.section_title} style={{
            textAlign: centered ?"center" : 'inherit',
        }}>
            <h1 className={className}>{title}</h1>
        <div></div>
        </div>
    )
}

export default Title;