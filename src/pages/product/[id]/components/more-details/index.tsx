import React from "react";
import Styles from "./more-details.module.scss";
import { Category } from "@/contexts/categories/types";
import { MoreDetailsProps } from "../../types";
import { useTranslation } from "react-i18next";
import { formatHashtags } from "@/utils/formatter/format-hashtags.util";


const MoreDetails: React.FC<MoreDetailsProps> =({
    description,
    pro_seller,
    pro_categories,
}) =>{
    const { t } = useTranslation('details');
    return (
        <div className={Styles.full_desc_section}>
            <div className={Styles.__title}>
                <h3 className={Styles.full_desc_title}>{t('specific_information')}</h3>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p>{t('origin')}:</p>
                </div>
                <div className={Styles.__desc}>
                    <p>{pro_seller}</p>
                </div>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p>{t('categories')}:</p>
                </div>
                <div className={Styles.__desc}>
                    {
                        pro_categories?.map((category: Category, index:number) =>(
                            <p key={index} className={Styles.tag}> {category.name} </p>
                        ))
                    }
                </div>
            </div>

            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p>{t('tags')}:</p>
                </div>
                <div className={Styles.__desc}>
                    {
                        pro_categories ?.map((tag: Category, index:number) =>(
                            <p key={index} className={Styles.tag}> {formatHashtags(tag.tags)} </p>
                        ))
                    }
                </div>
            </div>

            <br /><br /> <br />
            <div className={Styles.__title}>
                <h3 className={Styles.full_desc_title}>{t('product_description')}</h3>
            </div>
            <div className={Styles.specific_infos}>
                <div className={Styles.__subtitle}>
                    <p>{t('description')}:</p>
                </div>
                <div className={Styles.__desc}>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails;