import { BsPersonAdd } from 'react-icons/bs';
import Styles from './profile.module.scss';
import { User } from '@auth0/auth0-react';
import CustomButton from '@/components/custom-button';
import React from 'react';
import { useUserInfo } from '@/hooks/use-user-info';

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
};

export function Profile({ user, formData, handleChange }: ProfileProps) {
    const { updateUser } = useUserInfo();

    const handleRegisterClick = async () => {
        try {
            await updateUser({
                street: formData.name,
                number: formData.number,
                complement: '',
                neighborhood: '',
                city: formData.city,
                zipCode: formData.cep,
                country: {
                    code: 'BR',
                    name: formData.country,
                },
                state_or_department: formData.state_or_department,
            });
        } catch (error) {
            console.error('Error updating user address:', error);
        }
    };
    

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
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>ZIP:</label>
                    <input
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Estado:</label>
                    <input
                        type="text"
                        name="estado"
                        value={formData.state_or_department}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={formData.city}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Nimewo:</label>
                    <input
                        type="text"
                        name="nimewo"
                        value={formData.number}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Pays:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
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
