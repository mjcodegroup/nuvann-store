import { HomePageDefault } from '@/components/home-page-default';
import React, { useCallback, useEffect } from 'react';
import { Profile } from '../view/profile.view';
import { User } from '@auth0/auth0-react';
import { useUserInfo } from '@/hooks/use-user-info';
import ProfileCardSkeleton from '../components/profile-card-skeleton';

export default function ProfileController() {
    const { user, isLoading, getUserInfo } = useUserInfo();
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        cep: "",
        estado: "",
        ville: "",
        nimewo: ""
    });


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                cpf: user.address?.number || "",
                phone: user.phone_number || "",
                cep: user.address?.zipCode || "",
                estado: user.address?.state_or_department || "",
                ville: user.address?.city || "",
                nimewo: user.address?.number || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <HomePageDefault>
            {isLoading ? (
                <ProfileCardSkeleton/>
            ) : (
                <Profile user={user as User} formData={formData} handleChange={handleChange} />
            )}
        </HomePageDefault>
    );
}
