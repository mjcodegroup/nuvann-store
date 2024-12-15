import { HomePageDefault } from '@/components/home-page-default';
import React, { useEffect } from 'react';
import { Profile } from '../view/profile.view';
import { User } from '@auth0/auth0-react';
import { useUserInfo } from '@/hooks/use-user-info';
import ProfileCardSkeleton from '../components/profile-card-skeleton';

export default function ProfileController() {
    const { user, isLoading } = useUserInfo();
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        cep: "",
        state_or_department: "",
        city: "",
        number: "",
        country: ""
    });


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone_number || "",
                cep: user.address?.zipCode || "",
                state_or_department: user.address?.state_or_department || "",
                city: user.address?.city || "",
                number: user.address?.number || "",
                country: user.address?.country.name || ""
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
