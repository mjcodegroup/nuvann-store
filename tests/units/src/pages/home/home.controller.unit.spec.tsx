
import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import HomeController from '@/pages/index';

describe("HomeController", () =>{
    it("Should render HomePage with props", ()=>{
        const { container } = render(<HomeController />);
        expect(container).toMatchSnapshot();
    })
})