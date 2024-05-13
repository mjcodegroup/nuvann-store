
import React from 'react';
import { render } from '@testing-library/react';
import Home from '@/pages/home/view/home';
describe("Home", () =>{
    it("Should render HomePage with props", ()=>{
        const { getByText } = render(<Home />);
        const welcomeMessage = getByText(/welcome/i);
        expect(welcomeMessage).toBeInTheDocument();
    })
})