import { useRouter } from "next/router";
import { RouteUrl } from "@/utils/enums/routesUrl";

export function useNavigation() {
    const router = useRouter();
    const redirect = (url: RouteUrl) => {
        router.push(url)
    };

    const goBack = () => {
        router.back();
    };

    return {redirect, goBack}
}