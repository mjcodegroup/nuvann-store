import React from 'react';
import { BsPersonAdd } from 'react-icons/bs';
import Styles from './profile.module.scss';
import { User } from '@auth0/auth0-react';
import CustomButton from '@/components/custom-button';

type ProfileProps = {
    user: User;
    formData: {
        name: string;
        email: string;
        phone: string;
        cep: string;
        state_or_department: string;
        city: string;
        number: string;
        country: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegisterClick: () => void;
    errors: Record<string, string>;
};

export function Profile({ user, formData, handleChange, handleRegisterClick, errors }: ProfileProps) {
    return (
        <div className={Styles.profile}>
            <div className={Styles.picturePart}>
                <div className={Styles.profilePic}>
                    <BsPersonAdd className={Styles.sellerIcon} size={120} />
                </div>
                <h2>{user.name}</h2>
                <div className={Styles.details}>
                    <span>Email: {user.email}</span>
                    <span>Telefone: {formData.phone}</span>
                    <span>Zip: {formData.cep}</span>
                    <span>Ville: {formData.city}</span>
                    <span>Pays: {formData.country}</span>
                </div>
            </div>
            <div className={Styles.infosPart}>
                <h2>Personal informations</h2>
                {[
                    { label: 'Name', name: 'name', value: formData.name },
                    { label: 'Email', name: 'email', value: formData.email },
                    { label: 'Phone', name: 'phone', value: formData.phone },
                    { label: 'ZIP', name: 'cep', value: formData.cep },
                    { label: 'Estado', name: 'state_or_department', value: formData.state_or_department },
                    { label: 'Ville', name: 'city', value: formData.city },
                    { label: 'Nimewo', name: 'number', value: formData.number },
                    { label: 'Pays', name: 'country', value: formData.country },
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
                <div className={Styles.registerButtom}>
                    <CustomButton
                        backgroundColor="green"
                        textColor="white"
                        onClick={handleRegisterClick}
                    >
                        Anrejistre
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
