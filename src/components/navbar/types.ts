export interface NavOptionProps {
    user: any;
    isAuthenticated: boolean;
    onSignIn: () => void;
    isLoading: boolean;
    onLogout: () => void;
}

export type SearchBarProps = {
    placeholder: string;
    onSearch: (query: string) => void;
};