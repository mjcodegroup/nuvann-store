import { User } from "@auth0/auth0-react";

export type ProfileProps = {
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
    userAvatar: string;
};
