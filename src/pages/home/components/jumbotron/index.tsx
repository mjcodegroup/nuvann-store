import { Avatar } from '@mui/material';
import React from 'react'

import Styles from './jumbotron.module.scss';
import Title from '@/components/title';

interface jumbArray  {
  id: number;
  name: string;
  image: string;
  tags?:string[];
}

interface JumbotronProps {
  data: jumbArray[];
}

const Jumbotron: React.FC <JumbotronProps>  = ({data}) => {
  return (
    <div className={Styles.jumbotron_container}>
        {/* <Title title="Kategori" /> */}
        <div className={Styles.home_jumbotron}>
        {data?.map((jumb:jumbArray, index:number) => (
            <div className={Styles.jumbotron_content} key={jumb.name + index}>
              <Avatar alt="Remy Sharp" src={jumb.image} sx={{ width: 70, height: 70 }}/>
              <h3>{jumb.name}</h3>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Jumbotron;