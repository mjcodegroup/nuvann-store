import { useToast } from "@/contexts/toast";
import { useUser } from "@/contexts/user";
import { nuvannApi } from "@/services/api";
import React from "react";
import { PostBecomeSellerRequest } from "@/contexts/user/types";

export function useUserInfo() {
    const {state,  dispatch: userDispatch } = useUser();
    const {successToast, errorToast} = useToast();
  const [modalTerm, setModalTerm] = React.useState<boolean>(false);

    async function getUserInfo() {
        userDispatch({ type: 'SET_LOADING', value: true });
        const response = await nuvannApi.get('/users/me')
        userDispatch({ type: 'SET_USER', value: response.data });
        userDispatch({ type: 'SET_LOADING', value: false });
    }

    async function handleBecomeSeller(data: PostBecomeSellerRequest) {
        userDispatch({ type: 'SET_LOADING', value: true });
        try {
            const response = await nuvannApi.patch('/users/becomeSeller', data)
            successToast(response.data?.message || 'Success');
            setModalTerm(false);
            getUserInfo();
            window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_ACCESS_URL as string;
        } catch (error: any) {
            errorToast( error.response.data.message);
        }
        userDispatch({ type: 'SET_LOADING', value: false });
    }
    return {
        user: state.user,
        isLoading: state.isLoading,
        getUserInfo,
        handleBecomeSeller,
        modalTerm,
        setModalTerm
    }
}