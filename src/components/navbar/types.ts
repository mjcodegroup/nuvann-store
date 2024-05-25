export interface NavOptionProps {
    user: any;
}

export type SearchBarProps = {
    placeholder: string;
    onSearch: (query: string) => void;
};