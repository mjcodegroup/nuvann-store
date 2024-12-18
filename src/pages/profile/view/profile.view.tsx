import React from 'react';
import { BsPersonAdd } from 'react-icons/bs';
import Styles from './profile.module.scss';
import CustomButton from '@/components/custom-button';
import { Avatar } from '@mui/material';
import { ProfileProps } from '../types';
import { useTranslation } from 'react-i18next';

export function Profile({ user, formData, handleChange, handleRegisterClick, errors, userAvatar }: ProfileProps) {
    const { t } = useTranslation('profile_page');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        handleChange({
            target: { name, value }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={Styles.profile}>
            <div className={Styles.picturePart}>
                <div className={Styles.profilePic}>
                    {
                        userAvatar ?
                        <Avatar
                            alt={user.name}
                            src={userAvatar}
                            sx={{ width: '90%', height: '90%' }}
                        />
                        :
                        <BsPersonAdd className={Styles.sellerIcon} size={120} />
                    }
                </div>
                <h2>{user.name}</h2>
                <div className={Styles.details}>
                    <span>{t('email')}: {user.email}</span>
                    <span>{t('phone')}: {formData.phone}</span>
                    <span>{t('zip_code')}: {formData.cep}</span>
                    <span>{t('city')}: {formData.city}</span>
                    <span>{t('country')}: {formData.country}</span>
                </div>
            </div>
            <div className={Styles.infosPart}>
                <h2>{t('personal_information')}</h2>
                {[
                    { label: t('name'), name: 'name', value: formData.name },
                    { label: t('email'), name: 'email', value: formData.email },
                    { label: t('phone'), name: 'phone', value: formData.phone },
                    { label: t('zip_code'), name: 'cep', value: formData.cep },
                    { label: t('state'), name: 'state_or_department', value: formData.state_or_department },
                    { label: t('city'), name: 'city', value: formData.city },
                    { label: t('number'), name: 'number', value: formData.number },
                ].map((field) => (
                    <div className={Styles.infoItem} key={field.name}>
                        <label className={Styles.label}>{field.label}:</label>
                        <input
                            type="text"
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            className={Styles.input}
                        />
                        {errors[field.name] && (
                            <span className={Styles.error}>{errors[field.name]}</span>
                        )}
                    </div>
                ))}

                {/* Country Field as a Select Input */}
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>{t('country')}:</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleSelectChange}
                        className={Styles.select}
                    >
                        {["USA", "Canada", "Brazil", "Chile"].map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <span className={Styles.error}>{errors.country}</span>
                    )}
                </div>

                <div className={Styles.registerButtom}>
                    <CustomButton
                        backgroundColor="green"
                        textColor="white"
                        onClick={handleRegisterClick}
                    >
                        {t('register')}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
