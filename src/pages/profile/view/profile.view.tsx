import { BsPersonAdd } from 'react-icons/bs';
import Styles from './profile.module.scss';
import { User } from '@auth0/auth0-react';

type ProfileProps = {
    user: User;
    formData: {
        name: string;
        email: string;
        cpf: string;
        phone: string;
        cep: string;
        estado: string;
        ville: string;
        nimewo: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Profile({ user, formData, handleChange }: ProfileProps) {
    return (
        <div className={Styles.profile}>
            <div className={Styles.picturePart}>
                <div className={Styles.profilePic}>
                    <BsPersonAdd className={Styles.sellerIcon} size={120} />
                </div>
                <h2>{user.name}</h2>
                <div className={Styles.details}>
                    <span>Email: {user.email}</span>
                    <span>CPF: {formData.cpf}</span>
                    <span>Telefone: {formData.phone}</span>
                    <span>CEP: {formData.cep}</span>
                </div>
            </div>
            <div className={Styles.infosPart}>
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
                    <label className={Styles.label}>CPF:</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
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
                    <label className={Styles.label}>CEP:</label>
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
                        value={formData.estado}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
                <div className={Styles.infoItem}>
                    <label className={Styles.label}>Nimewo:</label>
                    <input
                        type="text"
                        name="nimewo"
                        value={formData.nimewo}
                        onChange={handleChange}
                        className={Styles.input}
                    />
                </div>
            </div>
        </div>
    );
}
