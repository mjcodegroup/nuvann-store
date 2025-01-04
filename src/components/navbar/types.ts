import { Category } from "@/contexts/categories/types";
import { User } from "@/contexts/user/types";
import { User as TUserAuth0 } from "@auth0/auth0-react";

export interface NavOptionProps {
    user: any;
    isAuthenticated: boolean;
    onSignIn?: () => void;
    isLoading: boolean;
    onLogout?: () => void;
    cartCount?: number;
}

export type SearchBarProps = {
    placeholder: string;
    onSearch: (query: string) => void;
};

export interface NavListProps {
    categories: Category[];
    onCategorySelect: (category: Category) => void;
    onClickSellerMenu: () => void;
    width: string;
    isAuthenticated: boolean;
    userInfos: User;
    isLoading: boolean;
}

export interface MobileNavbarProps {
    onClickMenu: () => void;
    categories: Category[];
    onCategorySelect: (category: Category) => void;
    onClickSellerMenu: () => void;
    width: string;
    isAuthenticated: boolean;
    user: TUserAuth0 | undefined;
    userInfos: User | undefined;
    onSignIn?: () => void;
    isLoading: boolean;
    onLogout?: () => void;
    cartCount?: number;
    placeholder: string;
    onSearch: (query: string) => void;
}