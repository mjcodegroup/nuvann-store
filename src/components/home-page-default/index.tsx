import React from 'react'
import classes from "./home-page-default.module.css"
import { Footer } from '../footer/index';
import { Navbar } from '../navbar/index';

interface PageDefaultProps {
    children: React.ReactNode;
}
export const HomePageDefault: React.FC<PageDefaultProps> = ({ children }) =>{
  return (
    <div>
        <h1><Navbar /></h1>

        <div className={classes.home_page_default_main_container}>
            {children}
        </div>

        <Footer />
    </div>
  )
}