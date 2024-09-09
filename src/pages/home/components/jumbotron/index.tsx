import React from 'react';
import Styles from './jumbotron.module.scss';
import Image from 'next/image';

export interface JumbotronProps {
    jumbs: JumbData[];
}

type JumbData = {
    title: string;
    Icon: string;
}
export default function Jumbotron(props: JumbotronProps) {
  return (
    <div className={Styles.jumb_container}>
        {
            props.jumbs?.map((jumb, index) =>
                <div key={index} className={Styles.jumb_content}>
                    <Image src={jumb?.Icon} alt={jumb?.title} width={100} height={100} /> 
                    <p className={Styles.jumb_title}>{jumb?.title}</p>
                </div>
            )
        }

    </div>
  )
}
