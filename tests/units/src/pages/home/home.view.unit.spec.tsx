
import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Home from '@/pages/home/view/home.view';
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock';
import { categoriesMock, jumDataMock } from '@/utils/mocks/home/jumbotron.mock';
import { ProductsData } from '@/contexts/products/types';

describe("HomeController", () =>{
    it("Should render HomePage with props", ()=>{
        const { container } = render(
        <Home
                heroImages={heroImagesMock}
                jumbsData={jumDataMock}
                categories={categoriesMock}
                loader={false}
                promo_products={{} as ProductsData}
                new_products={{} as ProductsData}
                onRedirectToProductDetails={jest.fn()}
                products={{} as ProductsData}
            />
    );
        expect(container).toMatchSnapshot();
    })
})