import React from "react";
import Styles from "./more-details.module.scss";


interface MoreDetailsProps {
    description?: any;
    pro_country?: any
    pro_seller?:string;
    pro_category?: any
    // pro_subCategory?:any;
    pro_tags?: any;
}


const MoreDetails: React.FC<MoreDetailsProps> =({
    description,
    pro_seller,
    pro_category,
    pro_tags
}) =>{
    return (
        <div className={Styles.full_desc_section}>
            <div className={Styles.__title}>
                <h3 className={Styles.full_desc_title}>Detay spesifik</h3>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p> Origin:</p>
                </div>
                <div className={Styles.__desc}>
                    <p>{pro_seller}</p>
                </div>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p> kategori:</p>
                </div>
                <div className={Styles.__desc}>
                    <p className={Styles.tag}>{pro_category}</p>
                </div>
            </div>

            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p> Tag:</p>
                </div>
                <div className={Styles.__desc}>
                    {
                        pro_tags?.map((tag: string, index:number) =>(
                            <p key={index} className={Styles.tag}> #{tag} </p>
                        ))
                    }
                </div>
            </div>

            <br /><br /> <br />
            <div className={Styles.__title}>
                <h3 className="full_desc_title">Deskripsyon Pwodui an</h3>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p> Dekripsyon:</p>
                </div>
                <div className={Styles.__desc}>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails;