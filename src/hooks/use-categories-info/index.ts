import { useCategories } from "@/contexts/categories";
import { nuvannApi } from "@/services/api";
import React from "react";


export function useCategoriesInfo() {
    const { state: categoriesState, dispatch: categoriesDispatch } = useCategories();

    async function getCategories() {
        const response = await nuvannApi.get('/categories')
        categoriesDispatch({ type: 'SET_CATEGORIES', value: response.data });
    }

    React.useEffect(() => {
        if(categoriesState.categories.length) return;
        getCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        categoriesState,
        getCategories,
    }
}