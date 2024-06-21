import { useRouter } from "next/router";
import { useNavigation } from "../../../src/hooks/useNavigation/index";
import { RouteUrl } from "@/utils/enums/routesUrl";

jest.mock("next/router", () => ({
    useRouter: jest.fn()
}));

describe("useNavigation", () => {
    let pushMock: jest.Mock;
    let backMock: jest.Mock;

    beforeEach(() => {
        pushMock = jest.fn();
        backMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
            back: backMock
        });
    });

    it("should redirect to the given URL", () => {
        const { redirect } = useNavigation();

        redirect('/some-path' as RouteUrl);

        expect(pushMock).toHaveBeenCalledWith('/some-path');
    });

    it("should go back", () => {
        const { goBack } = useNavigation();

        goBack();

        expect(backMock).toHaveBeenCalled();
    });
});
