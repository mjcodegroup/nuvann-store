import React, { use } from 'react';
import Styles from './jumbotron.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export interface JumbotronProps {
    jumbs: JumbData[];
}

type JumbData = {
    title: string;
    transCode: string;
    Icon: string;
}
export default function Jumbotron(props: JumbotronProps) {
    const { t } = useTranslation("home");
  return (
    <div className={Styles.jumb_container} suppressHydrationWarning>
        {
            props.jumbs?.map((jumb, index) =>
                <div key={index} className={Styles.jumb_content}>
                    <Image src={jumb?.Icon} alt={jumb?.title} width={100} height={100} /> 
                    <div className={Styles.jumb_title}>{t(`${jumb?.transCode}`)}</div>
                </div>
            )
        }

    </div>
  )
}
