import React, { useEffect, useState } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import { Profile } from '../view/profile.view';
import { useAuth0, User } from '@auth0/auth0-react';
import { useUserInfo } from '@/hooks/use-user-info';
import ProfileCardSkeleton from '../components/profile-card-skeleton';
import { z } from 'zod';

const schema = z.object({
    country: z.string().min(1, "Country is required"),
    name: z.string().min(1, "Name is required"),
    phone: z
        .string()
        .trim()
        .min(1, "Phone is required")
        .regex(/^[0-9]*$/, "Phone must be a number"),
    zipCode: z.string().min(1, "Zip code is required").regex(/^[0-9]*$/, "Zip code must be a number"),
    state_or_department: z.string().min(1, "State or department is required"),
    city: z.string().min(1, "City is required"),
    number: z.string().min(1, "Number is required").regex(/^[0-9]*$/, "Must be a number"),
});

export default function ProfileController() {
    const { user, isLoading, updateUser } = useUserInfo();
    const {
        user: Auth0UserInfos,
    } = useAuth0();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cep: "",
        state_or_department: "",
        city: "",
        number: "",
        country: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const handleRegisterClick = async () => {
        try {
            schema.parse({
                country: formData.country,
                name: formData.name,
                phone: formData.phone,
                zipCode: formData.cep,
                state_or_department: formData.state_or_department,
                city: formData.city,
                number: formData.number,
            });

            await updateUser({
                street: formData.name,
                number: formData.number,
                complement: '',
                neighborhood: '',
                phone: formData.phone,
                city: formData.city,
                zipCode: formData.cep,
                country: {
                    code: 'BR',
                    name: formData.country,
                },
                state_or_department: formData.state_or_department,
            });
            setErrors({});
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path.length > 0) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                console.error('Error updating user address:', error);
            }
        }
    };

    return (
        <HomePageDefault>
            {isLoading ? (
                <ProfileCardSkeleton />
            ) : (
                <Profile
                    user={user as User}
                    formData={formData}
                    handleChange={handleChange}
                    handleRegisterClick={handleRegisterClick}
                    errors={errors}
                    userAvatar={Auth0UserInfos?.picture || ''}
                />
            )}
        </HomePageDefault>
    );
}
