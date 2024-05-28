
import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Home from '@/pages/home/view/home.view';
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock';

describe("HomeController", () =>{
    it("Should render HomePage with props", ()=>{
        const { getByText } = render(<Home heroImages={heroImagesMock}/>);
        const welcomeMessage = getByText(/welcome/i);
        expect(welcomeMessage).toBeInTheDocument();
    })
})