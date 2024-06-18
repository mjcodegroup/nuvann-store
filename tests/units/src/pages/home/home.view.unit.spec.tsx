
import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Home from '@/pages/home/view/home.view';
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock';
import jumbArrayMock from '@/utils/mocks/home/jumbotron.mock';

describe("HomeController", () =>{
    it("Should render HomePage with props", ()=>{
        const { container } = render(<Home jumbotronData={jumbArrayMock}  heroImages={heroImagesMock}/>);
        expect(container).toMatchSnapshot();
    })
})