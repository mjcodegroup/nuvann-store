import { Category } from "@/contexts/categories/types";
import MobileNavbar from "./mobile-navbar";

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
}

export interface MobileNavbarProps extends NavOptionProps, NavListProps, SearchBarProps {
    onClickMenu: () => void;
}