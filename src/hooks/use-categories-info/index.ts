import { useCategories } from "@/contexts/categories";
import { nuvannApi } from "@/services/api";


export function useCategoriesInfo() {
    const { state: categoriesState, dispatch: categoriesDispatch } = useCategories();

    async function getCategories() {
        const response = await nuvannApi.get('/categories')
        categoriesDispatch({ type: 'SET_CATEGORIES', value: response.data });
    }

    return {
        getCategories,
    }
}