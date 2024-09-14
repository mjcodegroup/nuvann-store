import React from "react";

import Styles from './available-countries.module.scss';
import { useTranslation } from "react-i18next";

interface TitleProps {
    countries: any;
}


const AvailableCountries: React.FC<TitleProps> =({countries}) =>{
    const {t} = useTranslation('details');
    return (
        <div className={Styles.available_content}>
            <p>{t('details.available_countries')}:</p>
                {
                countries?.map((ava: string, index:number)=> (
                    <span key={index}>{ava}</span>
                ))
            }
        </div>
    )
}

export default AvailableCountries;